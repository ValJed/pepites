<template>
  <v-form @submit.prevent="createArtist()">
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
          class="img"
          :style="{ backgroundImage: `url(${imagePreview})`}"
        />
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
            v-for="video in artist.videos.youtube"
            :key="video"
            :url="video"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3>Releases</h3>
        <div class="releases">
          <SoundcloudPlayer />
          <SoundcloudPlayer />
          <SoundcloudPlayer />
        </div>
      </v-col>
      <v-col>
        <h3>Events</h3>
      </v-col>
    </v-row>
    <v-btn
      type="submit"
      color="primary"
      bottom="1rem"
      right="1rem"
      fixed
    >
      Create
    </v-btn>
  </v-form>
</template>

<script>
import Editor from '@/components/admin/Editor'
import YoutubePlayer from '@/components/common/YoutubePlayer'
import SoundcloudPlayer from '@/components/common/SoundcloudPlayer'

export default {
  components: {
    Editor,
    YoutubePlayer,
    SoundcloudPlayer
  },
  props: {
    initialArtist: {
      type: Object,
      default: () => ({
        name: '',
        genre: '',
        content: '',
        image: null,
        socialLinks: {
          facebook: null,
          instagram: null,
          youtube: null
        },
        releases: [],
        videos: {
          youtube: []
        },
        dates: []
      })
    }
  },
  data: () => ({
    artist: {
      name: '',
      genre: '',
      content: '',
      socialLinks: {
        facebook: '',
        instagram: '',
        youtube: ''
      },
      videos: {
        youtube: []
      }
      // ...this.initialArtist
    },
    imagePreview: null,
    videoInput: '',
    urlRegex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  }),
  watch: {
    initialArtist (newVal, oldVal) {
      console.log('oldVal ===> ', oldVal)
      console.log('newVal ===> ', newVal)
      // if (newVal) {
      //   this.project = newVal
      // } else {
      //   this.project = {
      //     name: '',
      //     description: '',
      //     imgUrl: '',
      //     content: ''
      //   }
      // }
    }
  },
  methods: {
    fileChange ({ target }) {
      const [file] = target.files
      this.imagePreview = URL.createObjectURL(file)
    },
    updateContent (content) {
      this.artist.content = content
    },
    addVideo ({ target: { value } }) {
      const val = value.includes('https://youtu.be/')
        ? value.replace('https://youtu.be/', 'https://youtube.com/embed/')
        : value

      this.artist.videos.youtube = [
        val,
        ...this.artist.videos.youtube
      ]
    },
    createArtist () {
      console.log('this.artist ===> ', this.artist)
    }
  }
}
</script>

<style src="./EditArtist.scss" scoped lang="scss" />
