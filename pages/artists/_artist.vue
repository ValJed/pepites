<template>
  <div class="page-artist">
    <Header :social-links="infos.socialLinks" />
    <v-container>
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
          <div class="artist-contacts">
            <h2>contacts</h2>
            <div v-if="infos.contacts.management.length">
              <h3>Management</h3>
              <ul>
                <li v-for="contact in infos.contacts.management" :key="contact.email">
                  <p>{{ contact.firstname }} {{ contact.lastname }} - {{ contact.email }}</p>
                </li>
              </ul>
            </div>
            <div v-if="infos.contacts.booking.length">
              <h3>Booking</h3>
              <ul>
                <li v-for="contact in infos.contacts.booking" :key="contact.email">
                  <p>{{ contact.firstname }} {{ contact.lastname }} - {{ contact.email }}</p>
                </li>
              </ul>
            </div>
            <div v-if="infos.contacts.press.length">
              <h3>press</h3>
              <ul>
                <li v-for="contact in infos.contacts.press" :key="contact.email">
                  <p>{{ contact.firstname }} {{ contact.lastname }} - {{ contact.email }}</p>
                </li>
              </ul>
            </div>
            <SocialLinks :links="artist.socialLinks" />
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <div class="artist-header">
            <h1>{{ artist.name }}</h1>
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
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import YoutubePlayer from '@/components/common/YoutubePlayer'
import SocialLinks from '@/components/website/SocialLinks'

export default {
  components: {
    Header,
    YoutubePlayer,
    SocialLinks
  },
  async asyncData (context) {
    const artist = await context.app.$axios.$get(`/artists/${context.params.artist}`)
    const infos = await context.app.$axios.$get('/infos')

    return { artist, infos }
  },
  data: () => ({
    artist: null,
    infos: null,
    serverUrl: process.env.serverUrl
  }),
  head: ({ artist }) => ({
    title: artist.name,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Description de notre artiste'
      }
    ]
  })

}
</script>
<style src="./_artist.scss" scoped lang='scss'></style>
