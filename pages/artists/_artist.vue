<template>
  <v-container class="page-artist">
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <div
          class="artist-img"
          :title="`${artist.name} - ${artist.genre}`"
          :style="{ backgroundImage: `url(${serverUrl}/public/uploads/${artist.img})`}"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <div class="artist-header">
          <h1>{{ artist.name }}</h1>
          <SocialLinks :links="artist.socialLinks" />
        </div>
        <div class="artist-content" v-html="artist.content" />
      </v-col>
    </v-row>
    <div
      v-if="artist.videos.youtube.length"
      class="artist-videos"
    >
      <h2>Videos</h2>
      <v-row class="artist-videos-list">
        <v-col
          v-for="(video, i) in artist.videos.youtube"
          :key="i"
          cols="12"
          sm="6"
          xl="4"
        >
          <YoutubePlayer
            :video-index="i"
            :url="video"
          />
        </v-col>
      </v-row>
    </div>

    <div
      v-if="artist.releases.length"
      class="artist-releases"
    >
      <h2>Releases</h2>
      <v-row class="artist-releases-list">
        <v-col
          v-for="(release, index) in artist.releases"
          :key="index"
          cols="12"
          :sm="artist.releases.length < 3 ? 6 : 4"
          xl="4"
        >
          <div
            class="artist-releases-player"
            v-html="release"
          />
        </v-col>
      </v-row>
    </div>

    <div
      v-if="artist.events.length"
      class="artist-events"
    >
      <h2>Events</h2>
      <ul>
        <li
          v-for="event in artist.events"
          :key="event.name"
        >
          <h3>{{ event.name }}</h3>
          <p>{{ event.location }}</p>
          <p>{{ event.date }}</p>
          <a :href="event.link" target="__blank">
            See more infos
          </a>
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import YoutubePlayer from '@/components/common/YoutubePlayer'
import SocialLinks from '@/components/website/SocialLinks'

export default {
  components: {
    YoutubePlayer,
    SocialLinks
  },
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
