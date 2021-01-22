<template>
  <div class="edit-artist">
    <v-container>
      <v-row class="form-header">
        <v-col
          classs="form-header-infos"
          align-self="baseline"
        >
          <v-text-field
            v-model="artist.name"
            label="Name"
            required
          />
          <v-text-field
            v-model="artist.genre"
            label="Genre"
            required
          />
        </v-col>
        <v-col class="form-header-img">
          <div
            v-if="imgPreview || artist.img"
            class="img"
            :style="{
              backgroundImage: `url(${imgPreview || `${serverUrl}/public/uploads/${artist.img}`})`
            }"
          />
          <div v-else class="img" />
          <button type="button">
            <v-icon color="primary" v-text="'mdi-camera'" />
            <input
              type="file"
              accept="image/png, image/jpeg"
              @change="fileChange"
            >
          </button>
        <!-- <v-file-input
            hide-input
            color="primary"
            accept="image/png, image/jpeg, image/bmp"
            icon-color="white"
            truncate-length="15"
            @change="fileChange"
          >
          </v-file-input> -->
        </v-col>
      </v-row>
      <client-only>
        <Editor
          :id="artist._id"
          :content="artist.content"
          :update-content="updateContent"
        />
      </client-only>
      <v-row>
        <v-col cols="3">
          <h3>Social Links</h3>
          <v-text-field
            v-model="artist.socialLinks.facebook"
            label="Facebook"
            required
          />
          <v-text-field
            v-model="artist.socialLinks.instagram"
            label="Instagram"
            required
          />
          <v-text-field
            v-model="artist.socialLinks.youtube"
            label="Youtube"
            required
          />
        </v-col>
        <v-col>
          <h3>Videos</h3>
          <v-text-field
            v-model="videoInput"
            label="Add a video"
            @keyup.enter="addVideo"
          />
          <div class="videos">
            <YoutubePlayer
              v-for="(video, i) in artist.videos.youtube"
              :key="i"
              :video-index="i"
              :url="video"
              :delete-video="deleteVideo"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3>Releases</h3>
          <v-text-field
            v-model="releasesInput"
            label="Add a release"
            @keyup.enter="addRelease"
          />
          <div class="releases">
            <div
              v-for="(release, index) in artist.releases"
              :key="index"
            >
              <v-icon
                class="circle-icon"
                color="primary"
                @click="deleteRelease(index)"
                v-text="'mdi-delete-empty'"
              />
              <div v-html="release" />
            </div>
          </div>
        </v-col>
        <v-col class="events">
          <EditEvents
            :events="artist.events"
            :add-event="addEvent"
            :delete-event="deleteEvent"
            :close-modal="closeModal"
          />
        </v-col>
      </v-row>
      <v-btn
        v-if="selectedArtist"
        color="primary"
        bottom
        right
        fixed
        @click="updateArtist(artist, imgFile)"
      >
        Update
      </v-btn>
      <v-btn
        v-else
        color="primary"
        bottom
        right
        fixed
        @click="createArtist(artist, imgFile)"
      >
        Create
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import Editor from '@/components/admin/Editor'
import YoutubePlayer from '@/components/common/YoutubePlayer'
import EditEvents from '@/components/admin/EditEvents'
// import EditEvent from '@/components/admin/EditEvent'
// import { urlRegex } from '@/utils'
// import SoundcloudPlayer from '@/components/common/SoundcloudPlayer'

const emptyArtist = {
  name: '',
  genre: '',
  content: '',
  img: '',
  socialLinks: {
    facebook: '',
    instagram: '',
    youtube: ''
  },
  videos: {
    youtube: []
  },
  releases: [],
  events: []
  // ...this.selectedArtist
}

export default {
  components: {
    Editor,
    YoutubePlayer,
    EditEvents
    // SoundcloudPlayer
  },
  props: {
    selectedArtist: {
      type: Object,
      default: null
    },
    createArtist: {
      type: Function,
      required: true
    },
    updateArtist: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    artist: {
      ...emptyArtist
    },
    imgPreview: null,
    videoInput: '',
    releasesInput: '',
    imgFile: null,
    modalOpened: false,
    serverUrl: process.env.serverUrl
  }),
  watch: {
    selectedArtist (newVal, oldVal) {
      this.artist = newVal || {
        ...emptyArtist
      }
      this.imgFile = null
      this.imgPreview = null
      this.videoInput = ''
      this.releasesInput = ''
    }
  },
  methods: {
    closeModal () {
      this.modalOpened = false
    },
    fileChange ({ target }) {
      const [file] = target.files
      this.imgPreview = URL.createObjectURL(file)

      this.imgFile = file
    },
    updateContent (content) {
      this.artist.content = content
    },
    addVideo ({ target: { value } }) {
      const replaceWith = 'https://youtube.com/embed/'
      const normalUrl = 'https://www.youtube.com/watch?v='
      const shareUrl = 'https://youtu.be/'

      const val = value.includes(shareUrl)
        ? value.replace(shareUrl, replaceWith)
        : value.includes(normalUrl)
          ? value.replace(normalUrl, replaceWith)
          : value

      this.artist.videos.youtube = [
        val,
        ...this.artist.videos.youtube
      ]

      this.videoInput = ''
    },
    deleteVideo (index) {
      this.artist.videos.youtube = this.artist.videos.youtube
        .filter((v, i) => i !== index)
    },
    addRelease ({ target: { value } }) {
      this.artist.releases = [
        value,
        ...this.artist.releases
      ]
      this.releasesInput = ''
    },
    deleteRelease (index) {
      this.artist.releases = this.artist.releases
        .filter((rel, i) => i !== index)
    },
    addEvent (event) {
      // if (typeof index === 'number') {
      //   this.artist.events = this.artist.events
      //     .map((e, i) => i === index ? event : e)
      // } else {
      this.artist.events.push(event)
      // }
    },
    deleteEvent (index) {
      this.artist.events = this.artist.events
        .filter((e, i) => i !== index)
    },
    updateEvent (event) {
      this.artists.events = this.artists.events
        .map(e => e)
    }
  }
}
</script>

<style src="./EditArtist.scss" scoped lang="scss" />
