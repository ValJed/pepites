<template>
  <v-container>
    <ul class="artists">
      <ArtistCard
        v-for="artist in artists"
        :key="artist.name"
        :artist="artist"
      />
    </ul>
  </v-container>
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
