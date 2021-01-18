<template>
  <v-container class="page-artist">
    <v-row>
      <v-col cols="4">
        <div
          class="artist-img"
          :style="{ backgroundImage: `url(${serverUrl}/public/uploads/${artist.img})`}"
        />
      </v-col>
      <v-col>
        <h1>{{ artist.name }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  async asyncData (context) {
    const artist = await context.app.$axios.$get(`/artists/${context.params.artist}`)

    return { artist }
  },
  data: () => ({
    artist: null,
    serverUrl: process.env.serverUrl
  })
}
</script>
<style src="./Artist.scss" scoped lang='scss'></style>
