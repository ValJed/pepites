<template>
  <v-container>
    <h2>Social Links</h2>
    <v-form @submit.prevent="login()">
      <v-text-field
        v-model="socialLinks.instagram"
        label="Instagram"
        dense
        required
      />
      <v-text-field
        v-model="socialLinks.youtube"
        label="Youtube"
        dense
        required
      />
      <v-text-field
        v-model="socialLinks.facebook"
        label="Facebook"
        dense
        required
      />
    </v-form>
    <h2>Contacts</h2>
    <v-row>
      <v-col>
        <h3>management</h3>
        <v-form @submit.prevent="addContact(inputs.management, 'management')">
          <v-text-field
            v-model="inputs.management.firstname"
            label="First Name"
            dense
            required
          />
          <v-text-field
            v-model="inputs.management.lastname"
            label="Last Name"
            dense
            required
          />
          <v-text-field
            v-model="inputs.management.email"
            label="Email"
            dense
            required
          />
          <v-btn
            type="submit"
            color="primary"
            small
          >
            Add
          </v-btn>
        </v-form>
        <ul class="contact-list">
          <li v-for="(contact, index) in contacts.management" :key="index">
            <v-icon
              color="primary"
              @click="deleteContact(index, 'management')"
              v-text="'mdi-trash-can'"
            />
            <p>{{ contact.firstname }} {{ contact.lastname }}</p>
            <p>{{ contact.email }}</p>
          </li>
        </ul>
      </v-col>
      <v-col>
        <h3>Booking</h3>
        <v-form @submit.prevent="addContact(inputs.booking, 'booking')">
          <v-text-field
            v-model="inputs.booking.firstname"
            label="First Name"
            dense
            required
          />
          <v-text-field
            v-model="inputs.booking.lastname"
            label="Last Name"
            dense
            required
          />
          <v-text-field
            v-model="inputs.booking.email"
            label="Email"
            dense
            required
          />
          <v-btn
            type="submit"
            color="primary"
            small
          >
            Add
          </v-btn>
        </v-form>
        <ul class="contact-list">
          <li v-for="(contact, index) in contacts.booking" :key="index">
            <v-icon
              color="primary"
              @click="deleteContact(index, 'booking')"
              v-text="'mdi-trash-can'"
            />
            <p>{{ contact.firstname }} {{ contact.lastname }}</p>
            <p>{{ contact.email }}</p>
          </li>
        </ul>
      </v-col>
      <v-col>
        <h3>Press</h3>
        <v-form @submit.prevent="addContact(inputs.press, 'press')">
          <v-text-field
            v-model="inputs.press.firstname"
            label="First Name"
            dense
            required
          />
          <v-text-field
            v-model="inputs.press.lastname"
            label="Last Name"
            dense
            required
          />
          <v-text-field
            v-model="inputs.press.email"
            label="Email"
            dense
            required
          />
          <v-btn
            type="submit"
            color="primary"
            small
          >
            Add
          </v-btn>
        </v-form>
        <ul class="contact-list">
          <li v-for="(contact, index) in contacts.press" :key="index">
            <v-icon
              color="primary"
              @click="deleteContact(index, 'press')"
              v-text="'mdi-trash-can'"
            />
            <p>{{ contact.firstname }} {{ contact.lastname }}</p>
            <p>{{ contact.email }}</p>
          </li>
        </ul>
      </v-col>
    </v-row>
    <v-btn
      color="primary"
      bottom
      right
      fixed
      @click="createOrUpdateInfos({socialLinks, contacts})"
    >
      {{ infos ? 'Update' : 'Create' }}
    </v-btn>
  </v-container>
</template>

<script>

export default {
  props: {
    infos: {
      type: Object,
      required: false,
      default: null
    },
    createOrUpdateInfos: {
      type: Function,
      required: true
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
      press: []
    },
    inputs: {
      management: {
        firstname: '',
        lastname: '',
        email: ''
      },
      booking: {
        firstname: '',
        lastname: '',
        email: ''
      },
      press: {
        firstname: '',
        lastname: '',
        email: ''
      }
    }
  }),
  watch: {
    infos (newVal, oldVal) {
      if (newVal) {
        this.socialLinks = newVal.socialLinks
        this.contacts = newVal.contacts
      }
    }
  },
  mounted () {
    if (this.infos) {
      this.socialLinks = this.infos.socialLinks
      this.contacts = this.infos.contacts
    }
  },
  methods: {
    addContact (contact, type) {
      this.contacts[type].push({ ...contact })
    },
    deleteContact (index, type) {
      this.contacts[type] = this.contacts[type]
        .filter((v, i) => i !== index)
    }
  }
}
</script>
<style src="./EditInfos.scss" scoped lang='scss'></style>
