<template>
  <div class="page-admin">
    <v-system-bar app color="primary" />
    <v-navigation-drawer
      permanent
      bottom
      height="auto"
    >
      <h3>Artists</h3>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="#eee"
        >
          <v-list-item>
            <v-list-item-title @click="selectArtist(null)">
              Add new artist
            </v-list-item-title>
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
                <v-list-item-icon>
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    v-text="'mdi-delete-empty'"
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
    </v-navigation-drawer>
    <v-container>
      <EditArtist
        :selected-artist="selectedArtist"
        :create-artist="createArtist"
        :update-artist="updateArtist"
      />
    </v-container>
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
// import { apiConfig } from '@/utils/config'

export default {
  components: {
    EditArtist
  },
  async asyncData (context) {
    const artists = await context.app.$axios.$get('/artists')

    return {
      artists
    }
  },

  data: () => ({
    group: false,
    sideBar: true,
    artists: [],
    selectedArtist: null,
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
          this.snackbar.msg = 'Artist successfully deleted.'
          this.snackbar.show = true
        }

        this.modalOpened = false
      } catch (err) {
        this.snackbar.msg = err.response.data
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
