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

      <div class="field center-align" v-if="toggleProgress">
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>

      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn indigo" :class="{'disabled': toggleProgress}">Login</button>
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
      feedback: null,
      toggleProgress: false
    }
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.toggleProgress = true
        this.feedback = null
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.toggleProgress = false
            this.$router.push({ name: 'Index' })
          })
          .catch(err => {
            this.toggleProgress = false
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
