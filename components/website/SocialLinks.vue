<template>
  <ul class="social-links">
    <li v-if="links.instagram">
      <a :href="links.instagram" target="_blank">
        <v-icon
          :color="color"
          v-text="'mdi-instagram'"
        />
      </a>
    </li>
    <li>
      <a :href="links.facebook" target="_blank">
        <v-icon
          :color="color"
          v-text="'mdi-facebook'"
        />
      </a>
    </li>
    <li>
      <a :href="links.youtube" target="_blank">
        <v-icon
          :color="color"
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
    },
    color: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>
<style src="./SocialLinks.scss" scoped lang='scss'></style>
