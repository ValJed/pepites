<template>
  <div class="page-login">
    <v-form @submit.prevent="login(form.username, form.psw)">
      <v-text-field
        v-model="form.username"
        label="Username"
        :rules="rules.username"
        small
        required
      />
      <v-text-field
        v-model="form.psw"
        label="Password"
        :rules="rules.psw"
        small
        required
      />

      <v-btn
        type="submit"
        color="primary"
        :loading="loading"
      >
        Login
      </v-btn>
    </v-form>
    <v-snackbar
      v-model="snackbar.show"
      timeout="5000"
      right
    >
      {{ snackbar.msg }}
      <template #action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

export default {
  data: () => ({
    loading: false,
    form: {
      username: '',
      psw: ''
    },
    rules: {
      username: [
        val => !!val || 'Username is required'
      // (val) => {
      //   const regex = /^[^\s]+@\w+\.\w+$/
      //   return regex.test(val) || 'Invalid Email'
      // }
      ],
      psw: [
        val => !!val || 'Password is required'
      ]
    },
    snackbar: {
      show: false,
      msg: ''
    }
  }),
  methods: {
    async login (username, password) {
      try {
        this.loading = true
        const { data, status } = await this.$axios.post('/login', {
          username,
          password
        })

        if (status === 200) {
          const date = new Date()
          date.setDate(date.getDate() + 1)

          document.cookie = `pep-token=${data.token}; expires=${date};`

          this.$router.push({ path: '/admin' })
        }

        this.loading = false

        // Notify user
      } catch ({ response }) {
        this.loading = false

        this.snackbar.msg = response.data
        this.snackbar.show = true
      }
    }
  }
}
</script>

<style src="./Login.scss" scoped lang='scss'></style>
