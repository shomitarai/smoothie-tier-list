<template>
  <div class="password">
    <div class="password-profile" v-if="!isPasswordEdit">
      <label for="password-view">Password:</label>
      <p name="password-view">*******</p>
      <a @click="toggleEditView" class="update-password">Update your password</a>
    </div>
    <div class="password-profile-edit" v-if="isPasswordEdit">
      <form @submit.prevent="pushPassword">
        <!-- <label for="cur-password-edit-view">Enter current password</label>
        <input type="text" name="cur-password-edit-view" class="field" v-model="curPassword" />-->
        <label for="new-password-edit-view">Enter new password</label>
        <input type="password" name="new-password-edit-view" class="field" v-model="newPassword" />
        <button class="btn indigo">Update password</button>
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
  data() {
    return {
      isPasswordEdit: false,
      newPassword: null,
      curPassword: null,
      feedback: null
    }
  },
  methods: {
    pushPassword() {
      // firebase auth
      let user = firebase.auth().currentUser
      user
        .updatePassword(this.newPassword)
        .then(() => {
          this.isPasswordEdit = false
          this.feedback = 'update has successful'
        })
        .catch(err => {
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
  position: relative;
  left: 10px;
  cursor: pointer;
}
</style>
