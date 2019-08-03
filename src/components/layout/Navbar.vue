<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-wrapper">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title">Smoothies Tier List</span>
        </router-link>
        <ul class="right">
          <li v-if="user">{{ user.email }}</li>
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
        <a href class="btn-floating btn-large halfway-fab pink">
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

export default {
  name: 'Navbar',
  data() {
    return {
      user: null
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
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
