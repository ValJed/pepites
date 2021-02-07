<template>
  <header>
    <!-- <v-container> -->
    <div class="logo">
      <LogoSvg />
    </div>
    <div class="links">
      <ul>
        <li>Contact</li>
      </ul>
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

    console.log('socialLinks ===> ', socialLinks)
    if (socialLinks) {
      this.facebookLink = socialLinks.facebook
      this.instagramLink = socialLinks.instagram
      this.youtubeLink = socialLinks.youtube
    }
  },
  fetchOnServer: false
}
</script>
<style src="./Header.scss" scoped lang='scss'></style>
