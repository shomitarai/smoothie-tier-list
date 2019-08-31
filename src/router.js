import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import AddSmoothie from '@/views/AddSmoothie'
import EditSmoothie from '@/views/EditSmoothie'
import Login from '@/views/auth/Login'
import Signup from '@/views/auth/Signup'
import ViewProfile from '@/views/ViewProfile'
import firebase from 'firebase'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-smoothie',
      name: 'AddSmoothie',
      component: AddSmoothie,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-smoothie',
      name: 'EditSmoothie',
      component: EditSmoothie,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/profile/:slug',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('SET_LOAD_STATUS', true)

  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  setTimeout(() => {
    store.commit('SET_LOAD_STATUS', false)
  }, 500)
})

export default router
