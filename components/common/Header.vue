<template>
  <header :class="{'showed': show}">
    <!-- <v-container> -->
    <nuxt-link class="logo" :to="'/'">
      <LogoSvg />
    </nuxt-link>
    <div class="links">
      <!-- <ul>
        <li>Contact</li>
      </ul> -->
      <ul class="social-links">
        <li>
          <a :href="facebookLink" target="_blank">
            <v-icon
              color="primary"
              v-text="'mdi-facebook'"
            />
          </a>
        </li>
        <li>
          <a :href="instagramLink" target="_blank">
            <v-icon
              color="primary"
              v-text="'mdi-instagram'"
            />
          </a>
        </li>
        <li>
          <a :href="youtubeLink" target="_blank">
            <v-icon
              color="primary"
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
import LogoSvg from '~/assets/svg/pep-logo2.svg'

export default {
  components: {
    LogoSvg
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    facebookLink: '',
    instagramLink: '',
    youtubeLink: ''
  }),
  async fetch () {
    if (this.facebookLink || this.instagramLink || this.youtubeLink) {
      return
    }

    const { data: { socialLinks } } = await this.$axios.get('/infos')

    if (socialLinks) {
      this.facebookLink = socialLinks.facebook
      this.instagramLink = socialLinks.instagram
      this.youtubeLink = socialLinks.youtube
    }
  },
  mounted () {
    console.log('this.showed ===> ', this.show)
  },
  fetchOnServer: false
}
</script>
<style src="./Header.scss" scoped lang='scss'></style>
