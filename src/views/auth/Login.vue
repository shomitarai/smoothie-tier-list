<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="indigo-text">Login</h2>

      <div class="field">
        <label for="email">Email:</label>
        <input type="text" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn indigo">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.feedback = null
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push({ name: 'Index' })
          })
          .catch(err => {
            this.feedback = err.message
          })
      } else {
        this.feedback = 'You must enter a Email and Password for Login.'
      }
    }
  }
}
</script>

<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}
.login h2 {
  font-size: 2.4em;
  margin-top: 20px;
  margin-bottom: 30px;
}

.login .field {
  margin-bottom: 16px;
}
</style>
