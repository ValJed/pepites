<template>
  <v-app>
    <!-- <Header /> -->
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
// import Header from '~/components/common/Header'

export default {
  components: {
    // Header
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style lang="scss">
  @import "~/assets/scss/main.scss";
  @import "~/assets/scss/variables.scss";
</style>
