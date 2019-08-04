<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="indigo-text">Signup</h2>

      <div class="field">
        <label for="userId">User ID:</label>
        <input type="text" name="userId" v-model="userId" />
      </div>
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
        <button class="btn indigo">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: 'Signup',
  data() {
    return {
      email: null,
      userId: null,
      password: null,
      feedback: null,
      toggleProgress: false
    }
  },
  methods: {
    signup() {
      if (this.email && this.userId && this.password) {
        this.toggleProgress = true
        this.slug = slugify(this.userId, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        // TODO check user ID process
        let checkUserId = firebase.functions().httpsCallable('checkUserId')
        checkUserId({ slug: this.slug })
          .then(result => {
            if (!result.data.unique) {
              this.toggleProgress = false
              this.feedback = 'This User ID already exists'
            } else {
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                  db.collection('users')
                    .doc(this.slug)
                    .set({
                      user_id: this.userId,
                      uid: cred.user.uid,
                      slug: this.slug
                    })
                })
                .then(() => {
                  this.toggleProgress = false
                  this.$router.push({ name: 'Index' })
                })
                .catch(err => {
                  this.toggleProgress = false
                  this.feedback = err.message
                })
            }
          })
          .catch(err => {
            this.toggleProgress = false
            this.feedback = err.message
          })
      } else {
        this.feedback = 'You must enter a User ID, Email and Password.'
      }
    }
  }
}
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
  margin-top: 20px;
  margin-bottom: 30px;
}

.signup .field {
  margin-bottom: 16px;
}
</style>
