<template>
  <v-container class="edit-users">
    <h2>Admin</h2>
    <div class="user">
      <h3>{{ admin.username }}</h3>
      {{ admin.email }}
    </div>
    <h2>Users</h2>
    <div class="users">
      <v-row>
        <v-col
          cols="4"
          sm="4"
          xl="4"
        >
          <v-form @submit.prevent="createUser()">
            <v-text-field
              v-model="nameInput"
              label="Name"
              dense
              required
            />
            <v-text-field
              v-model="emailInput"
              label="Email"
              dense
              required
            />
            <v-text-field
              v-model="passwordInput"
              label="Password"
              dense
              required
            />
            <v-btn
              type="submit"
              color="primary"
              small
            >
              Create
            </v-btn>
          </v-form>
        </v-col>
        <v-col cols="8">
          <ul>
            <li
              v-for="user in users"
              :key="user._id"
            >
              <p>{{ user.username }}</p>
              <p>{{ user.email }}</p>
            </li>
          </ul>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>

export default {
  props: {
    admin: {
      type: Object,
      required: true
    },
    users: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    nameInput: '',
    emailInput: '',
    pswInput: ''
  })
}
</script>
<style src="./EditUsers.scss" scoped lang='scss'></style>
