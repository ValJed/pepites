<template>
  <div class="yt-player">
    <v-icon
      class="circle-icon"
      color="primary"
      @click="deleteVideo(url)"
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
      required: true
    }
  }
}
</script>

<style lang="scss" src='./YoutubePlayer.scss' scoped></style>
