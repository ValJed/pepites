<template>
  <ul class="social-links">
    <li v-if="links.instagram">
      <a :href="links.instagram" target="_blank">
        <v-icon
          color="primary"
          v-text="'mdi-instagram'"
        />
      </a>
    </li>
    <li>
      <a :href="links.facebook" target="_blank">
        <v-icon
          color="primary"
          v-text="'mdi-facebook'"
        />
      </a>
    </li>
    <li>
      <a :href="links.youtube" target="_blank">
        <v-icon
          color="primary"
          v-text="'mdi-youtube'"
        />
      </a>
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    links: {
      type: Object,
      required: true
    }
  },
  mounted () {
    console.log('this.links ===> ', this.links)
  }
}
</script>
<style src="./SocialLinks.scss" scoped lang='scss'></style>
