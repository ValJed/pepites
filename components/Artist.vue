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
    <iframe
      width="100%"
      height="300"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/895636621&color=%230004ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
    />
    <div>
      <a
        href="https://soundcloud.com/nil-seeker"
        title="NilSeeker"
        target="_blank"
        style="color: #cccccc; text-decoration: none;"
      >NilSeeker</a> · <a href="https://soundcloud.com/nil-seeker/notruthforhumans" title="NoTruthForHumans" target="_blank" style="color: #cccccc; text-decoration: none;">NoTruthForHumans</a>
    </div>
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
