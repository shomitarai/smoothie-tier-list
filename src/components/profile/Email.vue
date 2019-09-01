<template>
  <div class="email">
    <div class="email-profile" v-if="!isEmailEdit">
      <label for="email-view">Email:</label>
      <p name="email-view">{{ email }}</p>
      <a @click="toggleEditView" class="update-email" v-if="editable">Update your email</a>
    </div>
    <div class="email-profile-edit" v-if="isEmailEdit">
      <form @submit.prevent="updateEmail">
        <label for="email-edit-view">Enter new email</label>
        <input type="text" class="field" v-model="newEmail" />
        <button class="btn indigo" :class="{'disabled': toggleProgress}">Update Email</button>

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
  name: 'Email',
  data() {
    return {
      isEmailEdit: false,
      newEmail: null,
      feedback: null,
      toggleProgress: false
    }
  },
  props: ['email', 'editable'],
  methods: {
    updateEmail() {
      // firebase auth
      this.toggleProgress = true
      let user = firebase.auth().currentUser
      user
        .updateEmail(this.newEmail)
        .then(() => {
          this.feedback = 'update has successful'
          this.isEmailEdit = false
          this.toggleProgress = false
        })
        .catch(err => {
          this.toggleProgress = false
          this.feedback = err.message
        })
    },
    toggleEditView() {
      this.isEmailEdit = !this.isEmailEdit
    }
  },
  created() {
    this.newEmail = this.email
  }
}
</script>

<style>
.email {
  padding: 10px;
  background-color: white;
}

.email .email-profile p {
  margin-top: 0px;
  font-size: 1.2em;
}
.email .update-email {
  cursor: pointer;
}
.email .cancel-btn {
  margin-left: 10px;
  cursor: pointer;
}

.email .preloader-wrapper {
  position: relative;
  top: 12px;
  margin-left: 10px;
}
</style>
