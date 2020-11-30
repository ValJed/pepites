<template>
  <div class="login-container">
    <form @submit.prevent="login(username, psw)">
      <label for="">Username</label>
      <input v-model="username" type="text">
      <label for="">Password</label>
      <input v-model="psw" type="password">
      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      username: '',
      psw: ''
    }
  },
  methods: {
    async login (username, password) {
      try {
        const res = await this.$axios.post('/login', {
          data: {
            username,
            password
          }
        })

        console.log('res ===> ', res)
      } catch (err) {
        console.error('err ===> ', err)
      }
    }
  }
}
</script>
<style src="./Login.scss" scoped lang='scss'></style>
