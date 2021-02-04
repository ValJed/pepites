<template>
  <v-container>
    <div class="logo">
      <LogoSvg />
    </div>
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
import LogoSvg from '~/assets/svg/pep-logo2.svg'

export default {
  components: {
    LogoSvg,
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
