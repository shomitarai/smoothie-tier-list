<template>
  <div class="view-profile container">
    <h2 class="indigo-text">{{ profile_user_id }}'s Profile</h2>
    <div class="row user-profile">
      <div class="col s12 m6 l6 xl6">
        <Email :email="user.email" :editable="isMatch()" />
      </div>
      <div class="col s12 m6 l6 xl6">
        <Password :editable="isMatch()" />
      </div>
    </div>
  </div>
</template>

<script>
import Email from '@/components/profile/Email'
import Password from '@/components/profile/Password'
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'ViewProfile',
  data() {
    return {
      user: null,
      profile_user: null,
      profile_user_id: null
    }
  },
  components: {
    Email,
    Password
  },
  methods: {
    isMatch(){
      if(!this.user || !this.profile_user){
        return false
      } else if(this.user.uid === this.profile_user.uid) {
        return true
      }
    }
  },
  created() {
    this.user = firebase.auth().currentUser

    db.collection('users').where('slug', '==', this.$route.params.slug)
    .get()
    .then( snapshot =>{
      snapshot.forEach(doc => {
        this.profile_user = doc.data()
        this.profile_user_id = doc.data().user_id
      })
    })
  },
  beforeUpdate(){   
    this.user = firebase.auth().currentUser
    db.collection('users').where('slug', '==', this.$route.params.slug)
    .get()
    .then( snapshot =>{
      snapshot.forEach(doc => {
        this.profile_user = doc.data()
        this.profile_user_id = doc.data().user_id
      })
    })

  }
}
</script>

<style>
/* .view-profile .row .col div {
  max-width: 100%;
} */
</style>
