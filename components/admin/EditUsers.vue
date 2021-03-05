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
          <v-form
            ref="form"
            @submit.prevent="submitForm(userForm)"
          >
            <v-text-field
              v-model="userForm.username"
              label="Name"
              :rules="rules.username"
              required
            />
            <v-text-field
              v-model="userForm.email"
              label="Email"
              required
            />
            <v-text-field
              v-model="userForm.psw"
              label="Password"
              type="password"
              :rules="[...rules.psw, pswSame]"
              required
            />
            <v-text-field
              v-model="userForm.repeatPsw"
              label="Repeat Password"
              type="password"
              :rules="[...rules.psw, pswSame]"
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
          <ul class="users-list">
            <li
              v-for="user in users"
              :key="user._id"
            >
              <v-icon
                color="#fff"
                @click="deleteUser(user._id)"
                v-text="'mdi-trash-can'"
              />
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
    },
    createUser: {
      type: Function,
      required: true
    },
    deleteUser: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    userForm: {
      username: '',
      email: '',
      psw: '',
      repeatPsw: ''
    },
    rules: {
      username: [
        val => !!val || 'Name is required'
      ],

      psw: [
        val => !!val || 'Password must be filled',
        val => val.length > 6 || 'Password must be at least 6 chars'
      ]

    }
  }),
  watch: {
    userForm: {
      handler ({ psw, repeatPsw }) {
        if (psw && repeatPsw) {
          this.$refs.form.validate()
        }
      },
      deep: true
    }
  },
  methods: {
    pswSame () {
      return (this.userForm.psw === this.userForm.repeatPsw) || 'Password must be the same'
    },
    submitForm (form) {
      const isValid = this.$refs.form.validate()

      if (isValid) {
        this.createUser(form)
      }
    }
  }
}
</script>
<style src="./EditUsers.scss" scoped lang='scss'></style>
