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
            <v-list-item-title>
              Add new artist
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-for="artist in artists" :key="artist.id">
            <v-list-item-title>
              {{ artist.name }}
            </v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="'mdi-delete-empty'" />
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-container>
      <EditArtist
        :artist="selectedArtist"
        :create-artist="createArtist"
      />
    </v-container>
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

  },

  data: () => ({
    group: false,
    sideBar: true,
    artists: [],
    selectedArtist: null
  }),

  async mounted () {
    const { status } = await this.$axios.get('verify')

    this.authorized = status === 200
  },

  methods: {

    selectProject (project) {
      this.aboutEditing = false
      this.selectedProject = project
    },

    async createArtist (artist) {
      const { data, status } = await this.$axios.post('/artists', artist)
      console.log('data ===> ', data)

      if (status === 200) {
        console.log('=============> 200 <================')
      }
    },

    updateArtist (artist) {
      console.log('artist ===> ', artist)
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