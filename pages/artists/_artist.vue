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
        <div class="artist-header">
          <h1>{{ artist.name }}</h1>
          <div class="social-links">
            social links
          </div>
        </div>
        <div class="artist-content" v-html="artist.content" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="artist-videos">
          <h2>Videos</h2>
          <div class="artist-videos-list">
            <YoutubePlayer
              v-for="(video, i) in artist.videos.youtube"
              :key="i"
              :video-index="i"
              :url="video"
            />
          </div>
        </div>

        <div class="artist-releases">
          <h2>Releases</h2>
          <div class="artist-releases-list">
            <div
              v-for="(release, index) in artist.releases"
              :key="index"
              v-html="release"
            />
          </div>
        </div>

        <div class="artist-events">
          <h2>Events</h2>
          <ul>
            <li
              v-for="event in artist.events"
              :key="event.name"
            >
              <h3>{{ event.name }}</h3>
              <p>{{ event.location }}</p>
              <p>{{ event.date }}</p>
            </li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import YoutubePlayer from '@/components/common/YoutubePlayer'

export default {
  components: {
    YoutubePlayer
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
