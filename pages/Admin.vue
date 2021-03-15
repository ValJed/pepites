<template>
  <div class="page-admin">
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon
        color="#fff"
        @click.stop="openedMenu = !openedMenu"
      />
      <h2>Admin</h2>
      <v-spacer />
      <div class="links">
        <ul>
          <li>
            <nuxt-link to="/">
              Home
            </nuxt-link>
          </li>
          <li @click="logout">
            Logout
          </li>
        </ul>
      </div>
    </v-app-bar>
    <aside
      :class="{ 'collapsed': !openedMenu }"
      color="secondary"
    >
      <v-list-item-group>
        <v-list-item>
          <v-list-item-title
            @click="
              showUsers = true
              showInfos = true
            "
          >
            Global infos
          </v-list-item-title>
          <v-icon
            color="primary"
            v-text="'mdi-cog'"
          />
        </v-list-item>
      </v-list-item-group>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-title
            @click="
              showInfos = false
              showUsers = true
            "
          >
            Manage Users
          </v-list-item-title>
          <v-icon
            color="primary"
            v-text="'mdi-account'"
          />
        </v-list-item>
      </v-list-item-group>

      <h3>Artists</h3>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="secondary"
        >
          <v-list-item>
            <v-list-item-title @click="selectArtist(null)">
              Add new artist
            </v-list-item-title>
            <v-icon
              color="primary"
              v-text="'mdi-account-plus'"
            />
          </v-list-item>

          <div
            v-for="artist in artists"
            :key="artist.id"
            class="drop-zone"
            @drop="onDrop($event, artist._id, artist.rank)"
            @dragenter.prevent.stop="dragEnter"
            @dragleave.prevent.stop="dragLeave"
            @dragover.prevent
          >
            <v-list-item
              draggable
              height="100%"
              @dragstart="dragStart($event, artist)"
              @dragend="dragEnd"
              @click="selectArtist(artist)"
            >
              <v-list-item-title>
                {{ artist.name }}
              </v-list-item-title>

              <v-dialog
                max-width="350"
              >
                <template #activator="{ on, attrs }">
                  <v-list-item-icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon
                      color="primary"
                      v-text="'mdi-trash-can'"
                    />
                  </v-list-item-icon>
                </template>
                <v-card class="delete-modal">
                  <v-card-text class="headline">
                    Are you sure you want to delete this artist ?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="primary"
                      text
                      @click="deleteArtist(artist._id, artist.img)"
                    >
                      Yes
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </aside>
    <div class="page-admin-content">
      <EditInfos
        v-if="showInfos"
        :infos="infos"
        :create-or-update-infos="createOrUpdateInfos"
      />
      <EditUsers
        v-else-if="showUsers"
        :admin="admin"
        :users="users"
        :create-user="createUser"
        :delete-user="deleteUser"
      />
      <EditArtist
        v-else
        :selected-artist="selectedArtist"
        :create-artist="createArtist"
        :update-artist="updateArtist"
      />
    </div>
    <v-snackbar
      v-model="snackbar.show"
      timeout="5000"
      right
    >
      {{ snackbar.msg }}
      <template #action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import EditArtist from '@/components/admin/EditArtist'
import EditInfos from '@/components/admin/EditInfos'
import EditUsers from '@/components/admin/EditUsers'

export default {

  components: {
    EditArtist,
    EditInfos,
    EditUsers
  },

  // middleware: 'auth',

  async asyncData (context) {
    const artists = await context.app.$axios.$get('/artists')
    const infos = await context.app.$axios.$get('/infos')
    const allUsers = await context.app.$axios.$get('/users')

    const { users, admin } = allUsers.reduce((acc, user) => {
      return {
        ...acc,
        ...user.admin
          ? { admin: user }
          : { users: [...acc.users || [], user] }
      }
    }, {})

    return {
      artists,
      admin,
      ...infos && { infos },
      ...users && { users }
    }
  },

  data: () => ({
    openedMenu: true,
    group: false,
    sideBar: true,
    artists: [],
    users: [],
    infos: null,
    selectedArtist: null,
    showInfos: false,
    showUsers: false,
    snackbar: {
      show: false,
      msg: ''
    },
    modalOpened: false
  }),

  async mounted () {
    const { status } = await this.$axios.get('verify')

    this.authorized = status === 200
  },

  methods: {

    selectArtist (artist) {
      this.showInfos = false
      this.showUsers = false
      this.selectedArtist = artist
    },

    async createArtist (artist, imgFile) {
      try {
        const fd = new FormData()

        if (imgFile) {
          fd.append('image', imgFile, imgFile.name)
        }

        fd.append('artist', JSON.stringify({ ...artist, rank: this.artists.length + 1 }))

        const { status, data } = await this.$axios.post('/artists', fd)

        if (status === 200) {
          this.artists.push(data)
          this.selectedArtist = data

          this.snackbar.msg = 'This artist has been successfully created'
          this.snackbar.show = true
        }
      } catch ({ response }) {
        this.snackbar.msg = response.data.validation
          ? response.data.validation.body.message
          : response.data

        this.snackbar.show = true
      }
    },

    async updateArtist (artist, imgFile) {
      try {
        const fd = new FormData()

        if (imgFile) {
          fd.append('image', imgFile, imgFile.name)
        }

        fd.append('artist', JSON.stringify(artist))

        const { status, data } = await this.$axios.put('/artists', fd)

        if (status === 200) {
          this.artists = this.artists.map((art) => {
            return art._id === artist._id
              ? data
              : art
          })
          this.selectedArtist = data

          this.snackbar.msg = 'This artist has been successfully updated'
          this.snackbar.show = true
        }
      } catch ({ response }) {
        this.snackbar.msg = response.data.validation
          ? response.data.validation.body.message
          : response.data

        this.snackbar.show = true
      }
    },

    async deleteArtist (artistId, artistImg) {
      try {
        const { status } = await this.$axios.delete('/artists', { data: { artistId, artistImg } })

        if (status === 200) {
          this.artists = this.artists.filter(artist => artist._id !== artistId)
          if (this.selectedArtist && this.selectedArtist._id === artistId) {
            this.selectedArtist = null
          }
          this.snackbar.msg = 'Artist successfully deleted'
          this.snackbar.show = true
        }

        this.modalOpened = false
      } catch (err) {
        this.snackbar.msg = typeof err.response.data === 'string'
          ? err.response.data
          : err.response.statusText
        this.snackbar.show = true
      }
    },

    async createOrUpdateInfos (infos) {
      try {
        const { data, status } = await this.$axios.post('/infos', infos)

        if (status === 200) {
          this.infos = data
          this.snackbar.msg = 'Infos successfully created'
          this.snackbar.show = true
        }
      } catch (err) {
        this.snackbar.msg = err.response.data.validation
          ? err.response.data.validation.body.message
          : err.response.statusText
        this.snackbar.show = true
      }
    },

    async createUser (user) {
      try {
        const { data, status } = await this.$axios.post('/users', user)

        if (status === 201) {
          this.users.push(data)
          this.snackbar.msg = 'User successfully created'
          this.snackbar.show = true
        }
      } catch (err) {
        this.snackbar.msg = 'Error when creating user'
        this.snackbar.show = true
      }
    },

    async deleteUser (userId) {
      try {
        const { status } = await this.$axios.delete('/users', { data: { userId } })

        if (status === 200) {
          this.users = this.users.filter(user => user._id !== userId)
          this.snackbar.msg = 'User successfully deleted'
          this.snackbar.show = true
        }
      } catch (err) {
        this.snackbar.msg = 'Error when deleting user'
        this.snackbar.show = true
      }
    },

    dragStart ({ target, dataTransfer }, item) {
      dataTransfer.dropEffect = 'move'
      dataTransfer.effectAllowed = 'move'
      dataTransfer.setData('movedId', item._id)
      setTimeout(() => {
        target.parentNode.classList.add('invisible')
      }, 0)
    },

    async updateArtistsRanks (artists) {
      try {
        const { status } = await this.$axios.put('/artists/ranks', { artists })

        if (status === 200) {
          this.snackbar.msg = 'Updated'
          this.snackbar.show = true
        }
      } catch ({ response }) {
        this.snackbar.msg = response.data
        this.snackbar.show = true
      }
    },

    dragEnd ({ target }) {
      target.parentNode.classList.remove('invisible')
      document.querySelectorAll('.drop-zone').forEach((elem) => {
        elem.classList.remove('hovered')
      })
    },

    dragEnter ({ target, currentTarget }) {
      if (target.classList && target.classList.contains('v-list-item__title')) {
        currentTarget.classList.add('hovered')
      }
    },

    dragLeave ({ target, currentTarget }) {
      if (target.classList && target.classList.contains('v-list-item__title')) {
        currentTarget.classList.remove('hovered')
      }
    },

    onDrop ({ dataTransfer }, dropId, dropRank) {
      const movedId = dataTransfer.getData('movedId')
      const movedArtist = this.artists.find(art => art._id === movedId)
      const moveDown = movedArtist.rank < dropRank

      if (dropRank === movedArtist.rank + 1) {
        return
      }

      const [artists, toUpdate] = this.artists.reduce(([acc, toUpdate], artist) => {
        // Move the dragged item to its new place, just before the artist in the drop box
        if ([dropId, movedId].includes(artist._id)) {
          return artist._id === dropId
            ? [
                [
                  ...acc,
                  {
                    ...movedArtist,
                    rank: moveDown ? artist.rank - 1 : artist.rank
                  },
                  {
                    ...artist,
                    ...!moveDown && { rank: artist.rank + 1 }
                  }
                ],
                [
                  ...toUpdate,
                  {
                    _id: movedArtist._id,
                    rank: moveDown ? artist.rank - 1 : artist.rank
                  },
                  {
                    _id: artist._id,
                    rank: moveDown ? artist.rank : artist.rank + 1
                  }
                ]
              ]
            : [acc, toUpdate]
        }

        // Be sure to update only items in the slice between
        // the two updated items, whatever the direction
        const isInSlice = moveDown
          ? artist.rank < dropRank && artist.rank > movedArtist.rank
          : artist.rank > dropRank && artist.rank < movedArtist.rank

        const updatedArtist = {
          ...artist,
          rank: moveDown ? artist.rank - 1 : artist.rank + 1
        }

        return [
          [
            ...acc,
            ...isInSlice ? [updatedArtist] : [artist]
          ],
          [
            ...toUpdate,
            ...isInSlice
              ? [{ _id: updatedArtist._id, name: updatedArtist.name, rank: updatedArtist.rank }]
              : []
          ]
        ]
      }, [[], []])

      this.artists = artists

      this.updateArtistsRanks(toUpdate)
    },

    logout () {
      document.cookie = 'pep-token=;'

      if (this.$router.currentRoute.name === 'Admin') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style src="./Admin.scss" lang="scss"  />
