<template>
  <li class="artist">
    <nuxt-link to="/">
      <div
        class="artist-img"
        :style="{ backgroundImage: `url(https://picsum.photos/400/300)`}"
      />
      <h3>{{ artist.name }}</h3>
      <p>{{ artist.content }}</p>
    </nuxt-link>
  </li>
</template>

<script>

export default {
  props: {
    artist: {
      type: Object,
      required: true
    }
  },
  mounted () {
    console.log('this.artist ===> ', this.artist)
  }
}
</script>
<style src="./Artist.scss" lang='scss' scoped></style>
