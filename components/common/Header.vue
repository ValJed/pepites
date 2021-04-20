<template>
  <header :class="{'home-page': isHome}">
    <!-- <v-container> -->
    <nav :class="{}">
      <nuxt-link class="logo" :to="'/'">
        <FullLogoSvg v-if="isHome" />
        <LogoSvg v-else />
      </nuxt-link>
      <ul
        v-if="artists"
        class="artists-menu"
      >
        <li
          v-for="art in artists"
          :key="art._id"
          class="artists-menu-item"
        >
          <nuxt-link :to="`/artists/${art._id}`">
            <!-- <div
              :style="{
                backgroundImage: `url(${serverUrl}/public/uploads/${art.img})`
              }"
            /> -->
            <h4>{{ art.name }}</h4>
            <DiamondSvg />
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="links">
      <!-- <ul>
        <li>Contact</li>
      </ul> -->
      <ul class="social-links">
        <li v-if="socialLinks.facebook">
          <a :href="socialLinks.facebook" target="_blank">
            <v-icon
              v-text="'mdi-facebook'"
            />
          </a>
        </li>
        <li v-if="socialLinks.instagram">
          <a :href="socialLinks.instagram" target="_blank">
            <v-icon
              v-text="'mdi-instagram'"
            />
          </a>
        </li>
        <li v-if="socialLinks.youtube">
          <a :href="socialLinks.youtube" target="_blank">
            <v-icon
              v-text="'mdi-youtube'"
            />
          </a>
        </li>
      </ul>
    </div>
    <!-- </v-container> -->
  </header>
</template>

<script>
import FullLogoSvg from '@/assets/svg/pep-logo2.svg'
import LogoSvg from '@/assets/svg/pep-logo1.svg'
import DiamondSvg from '@/assets/svg/pep-diamond-secondary.svg'

export default {
  components: {
    FullLogoSvg,
    LogoSvg,
    DiamondSvg
  },
  props: {
    // show: {
    //   type: Boolean,
    //   required: true
    // },
    isHome: {
      type: Boolean,
      required: false,
      default: false
    },
    socialLinks: {
      type: Object,
      required: true
    },
    artists: {
      type: Array,
      required: false,
      default: null
    }
  },
  data: () => ({
    facebookLink: '',
    instagramLink: '',
    youtubeLink: '',
    serverUrl: process.env.serverUrl
  })
}
</script>
<style src="./Header.scss" scoped lang='scss'></style>
