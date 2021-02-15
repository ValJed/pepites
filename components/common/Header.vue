<template>
  <header :class="{'home-page': isHome}">
    <!-- <v-container> -->
    <nuxt-link class="logo" :to="'/'">
      <FullLogoSvg v-if="isHome" />
      <LogoSvg v-else />
    </nuxt-link>
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
import FullLogoSvg from '~/assets/svg/pep-logo2.svg'
import LogoSvg from '~/assets/svg/pep-logo1.svg'

export default {
  components: {
    FullLogoSvg,
    LogoSvg
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
    }
  },
  data: () => ({
    facebookLink: '',
    instagramLink: '',
    youtubeLink: ''
  })
}
</script>
<style src="./Header.scss" scoped lang='scss'></style>
