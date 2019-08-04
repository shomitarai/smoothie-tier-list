<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-wrapper">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title">Smoothies Tier List</span>
        </router-link>
        <ul class="right">
          <li v-if="user">
            <router-link :to="{ name: 'ViewProfile',  params: { slug: slug } }">{{ user_id }}</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{name: 'Signup'}">Signup</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{name: 'Login'}">Login</router-link>
          </li>
          <li v-if="user">
            <a @click="logout">Logout</a>
          </li>
        </ul>
        <a href class="btn-floating btn-large halfway-fab pink" v-if="user">
          <router-link :to="{ name: 'AddSmoothie' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
  name: 'Navbar',
  data() {
    return {
      user: null,
      user_id: null,
      slug: null
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user

        db.collection('users')
          .where('uid', '==', user.uid)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.user_id = doc.data().user_id
              this.slug = doc.data().slug
            })
          })
      } else {
        this.user = null
      }
    })
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
    }
  }
}
</script>


<style>
.navbar nav {
  padding: 0 20px;
}
</style>
