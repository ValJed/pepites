<template>
  <v-form
    ref="form"
    v-model="valid"
    class="form-event"
    @submit.prevent="submitForm(form)"
  >
    <v-text-field
      v-model="form.name"
      label="Name"
      :rules="rules.name "
      required
    />
    <v-text-field
      v-model="form.location"
      label="Location"
      :rules="rules.location"
      required
    />
    <v-text-field
      v-model="form.link"
      label="Facebook link"
      :rules="rules.link"
      required
    />

    <v-text-field
      v-model="form.date"
      label="Date"
      :rules="rules.date"
      readonly
      required
    />

    <v-date-picker
      v-model="form.date"
      class="date-picker"
      flat
      no-title
    />

    <v-btn v-if="!event" :disabled="!valid" type="submit">
      Create
    </v-btn>
  </v-form>
</template>

<script>
import { urlRegex, dateRegex } from '@/utils'

const emptyForm = {
  name: '',
  location: '',
  link: '',
  date: null
}

export default {
  props: {
    event: {
      type: Object,
      required: false,
      default: null
    },
    addEvent: {
      type: Function,
      required: true
    },
    closeModal: {
      type: Function,
      required: true
    },
    eventIndex: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
      valid: true,
      form: this.event || { ...emptyForm },
      rules: {
        name: [
          val => !!val || 'Name is required'
        ],
        location: [
          val => !!val || 'Location is required'
        ],
        link: [
          val => urlRegex.test(val) || 'Link must be an url'
        ],
        date: [
          val => dateRegex.test(val) || 'Date should be set'
        ]
      }
    }
  },
  watch: {
    event (newVal, oldVal) {
      this.form = !newVal
        ? { ...emptyForm }
        : newVal
      this.$refs.form.resetValidation()
    }
  },
  methods: {
    validate () {
      this.valid = this.$refs.form.validate()
    },
    submitForm (form, eventIndex) {
      this.validate()

      if (this.valid) {
        this.addEvent({ ...form }, eventIndex)
        this.closeModal()
        this.$refs.form.reset()
      }
    }
  }
}
</script>

<style src="./EditEvent.scss" scoped lang='scss'></style>
