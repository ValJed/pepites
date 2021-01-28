<template>
  <v-form @submit.prevent="login()">
    <v-text-field
      v-model="form.username"
      label="Username"
      :rules="rules.username"
      small
      required
    />
  </v-form>
</template>

<script>

export default {
  props: {
    infos: {
      type: Object,
      required: false,
      default: null
    }
  },
  data: () => ({
    socialLinks: {
      facebook: '',
      youtube: '',
      instagram: ''
    },
    contacts: {
      management: [],
      booking: [],
      presse: []
    }
  })
}
</script>
<style src="" scoped lang='scss'></style>
