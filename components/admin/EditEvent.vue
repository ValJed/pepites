<template>
  <v-form @submit.prevent="addEvent()">
    <v-text-field
      v-model="eventNameInput"
      label="Name"
      required
    />
    <v-text-field
      v-model="eventLocationInput"
      label="Location"
      required
    />
    <v-text-field
      v-model="eventLinkInput"
      label="Facebook link"
      required
    />

    <v-date-picker
      v-model="eventDateInput"
      class="date-picker"
      flat
      no-title
    />

    <v-btn type="submit">
      Create
    </v-btn>
  </v-form>
</template>

<script>

export default {
  props: {
    addEvent: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    name: '',
    location: '',
    link: '',
    date: null
  })
}
</script>

<style src="./EditEvent.scss" scoped lang='scss'></style>
