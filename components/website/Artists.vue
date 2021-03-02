<template>
  <div class="artists">
    <ul class="artists-list">
      <ArtistCard
        v-for="artist in artists"
        :key="artist.name"
        :artist="artist"
      />
    </ul>
  </div>
</template>

<script>
import ArtistCard from './ArtistCard'

export default {
  components: {
    ArtistCard
  },
  props: {
    artists: {
      type: Array,
      required: true
    }
  }
}
</script>
<style src="./Artists.scss" scoped lang='scss'></style>
