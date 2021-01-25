<template>
  <div class="yt-player">
    <v-icon
      v-if="deleteVideo"
      class="circle-icon"
      color="primary"
      @click="deleteVideo(videoIndex)"
      v-text="'mdi-delete-empty'"
    />
    <iframe
      :src="url"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script>

export default {
  props: {
    url: {
      type: String,
      required: true
    },
    deleteVideo: {
      type: Function,
      required: false,
      default: null
    },
    videoIndex: {
      type: Number,
      required: true
    }
    // height: {
    //   type: Number,
    //   required: true
    // },
    // width: {
    //   type: Number,
    //   required: true
    // }
  }
}
</script>

<style lang="scss" src='./YoutubePlayer.scss' scoped></style>
