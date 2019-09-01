<template>
  <div class="password">
    <div class="password-profile" v-if="!isPasswordEdit">
      <label for="password-view">Password:</label>
      <p name="password-view">*******</p>
      <a @click="toggleEditView" class="update-password" v-if="editable">Update your password</a>
    </div>
    <div class="password-profile-edit" v-if="isPasswordEdit">
      <form @submit.prevent="pushPassword">
        <!-- <label for="cur-password-edit-view">Enter current password</label>
        <input type="text" name="cur-password-edit-view" class="field" v-model="curPassword" />-->
        <label for="new-password-edit-view">Enter new password</label>
        <input type="password" name="new-password-edit-view" class="field" v-model="newPassword" />
        <button class="btn indigo">Update password</button>
        <div class="preloader-wrapper small active" v-if="toggleProgress">
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
        <a @click="toggleEditView" class="cancel-btn">Cancel</a>
      </form>
    </div>
    <p v-if="feedback" class="red-text">{{ feedback }}</p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Password',
  props: ['editable'],
  data() {
    return {
      isPasswordEdit: false,
      newPassword: null,
      curPassword: null,
      feedback: null,
      toggleProgress: false
    }
  },
  methods: {
    pushPassword() {
      // firebase auth
      this.toggleProgress = true
      let user = firebase.auth().currentUser
      user
        .updatePassword(this.newPassword)
        .then(() => {
          this.isPasswordEdit = false
          this.feedback = 'update has successful'
          this.toggleProgress = false
        })
        .catch(err => {
          this.toggleProgress = false
          this.feedback = err.message
        })
    },
    toggleEditView() {
      this.isPasswordEdit = !this.isPasswordEdit
    }
  }
}
</script>

<style>
.password {
  padding: 10px;
  background-color: white;
}

.password .password-profile p {
  margin-top: 0px;
  font-size: 1.2em;
}
.password .update-password {
  cursor: pointer;
}
.password .cancel-btn {
  margin-left: 10px;
  cursor: pointer;
}

.password .preloader-wrapper {
  position: relative;
  top: 12px;
  margin-left: 10px;
}
</style>
