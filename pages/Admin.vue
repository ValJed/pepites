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
            <v-list-item-icon>
              <v-icon
                @click="deleteArtist(artist._id)"
                v-text="'mdi-delete-empty'"
              />
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-container>
      <EditArtist
        :selected-artist="selectedArtist"
        :create-artist="createArtist"
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
    }
  }),

  async mounted () {
    const { status } = await this.$axios.get('verify')

    this.authorized = status === 200
  },

  methods: {

    selectArtist (artist) {
      this.selectedArtist = artist
    },

    async createArtist (artist) {
      try {
        const { data, status } = await this.$axios.post('/artists', artist)
        console.log('data ===> ', data)

        if (status === 200) {
          this.artists.push(data)
        }
      } catch ({ response }) {
        this.snackbar.msg = response.data.validation
          ? response.data.validation.body.message
          : response.data

        this.snackbar.show = true
      }
    },

    async updateArtist (artist) {
      console.log('artist ===> ', artist)
    },

    async deleteArtist (artistId) {
      try {
        console.log('this.$axios ===> ', this.$axios)
        const { status, data } = await this.$axios.$delete('/artists', { artistId })

        console.log('status ===> ', status)
        console.log('data ===> ', data)
      } catch (err) {

      }
    },

    showCrendentialsModal () {
      this.$refs.credentialsModal.showModal()
    },

    updateCrendentials (data) {
      console.log('data ===> ', data)
    }
  }
}
</script>

<style src="./Admin.scss" lang="scss"  />
