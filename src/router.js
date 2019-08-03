import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/Index";
import AddSmoothie from "@/views/AddSmoothie";
import EditSmoothie from "@/views/EditSmoothie";
import Login from "@/views/auth/Login";
import Signup from "@/views/auth/Signup";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/add-smoothie",
      name: "AddSmoothie",
      component: AddSmoothie,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit-smoothie",
      name: "EditSmoothie",
      component: EditSmoothie,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
