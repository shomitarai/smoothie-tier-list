<template>
  <div class="view-profile container">
    <h2 class="indigo-text">{{ $route.params.slug }}'s Profile</h2>
    <div class="row user-profile" v-if="user">
      <div class="col s12 m6 l6 xl6">
        <Email :email="user.email" />
      </div>
      <div class="col s12 m6 l6 xl6">
        <Password />
      </div>
    </div>
  </div>
</template>

<script>
import Email from '@/components/profile/Email'
import Password from '@/components/profile/Password'
import firebase from 'firebase'

export default {
  name: 'ViewProfile',
  data() {
    return {
      user: null
    }
  },
  components: {
    Email,
    Password
  },
  created() {
    this.user = firebase.auth().currentUser
  }
}
</script>

<style>
/* .view-profile .row .col div {
  max-width: 100%;
} */
</style>
