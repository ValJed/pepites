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
          <li>Logout</li>
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
            @click="showInfos = true"
          >
            Global infos
          </v-list-item-title>
          <v-icon
            color="primary"
            v-text="'mdi-cog'"
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

          <v-list-item
            v-for="artist in artists"
            :key="artist.id"
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
        </v-list-item-group>
      </v-list>
    </aside>
    <div class="page-admin-content">
      <EditInfos
        v-if="showInfos"
        :infos="infos"
        :create-or-update-infos="createOrUpdateInfos"
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
// import GlobalForm from '@/components/admin/GlobalForm'
import EditInfos from '@/components/admin/EditInfos'
// import { apiConfig } from '@/utils/config'

export default {
  components: {
    EditArtist,
    EditInfos
  },
  async asyncData (context) {
    const artists = await context.app.$axios.$get('/artists')
    const infos = await context.app.$axios.$get('/infos')

    return {
      artists,
      ...infos && { infos }
    }
  },

  data: () => ({
    openedMenu: true,
    group: false,
    sideBar: true,
    artists: [],
    infos: null,
    selectedArtist: null,
    showInfos: false,
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
      this.selectedArtist = artist
    },

    async createArtist (artist, imgFile) {
      try {
        const fd = new FormData()

        if (imgFile) {
          fd.append('image', imgFile, imgFile.name)
        }

        fd.append('artist', JSON.stringify(artist))

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

    // showCrendentialsModal () {
    //   this.$refs.credentialsModal.showModal()
    // },

    updateCrendentials (data) {
    }
  }
}
</script>

<style src="./Admin.scss" lang="scss"  />
