import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/Index";
import AddSmoothie from "@/views/AddSmoothie";
import EditSmoothie from "@/views/EditSmoothie";
import Login from "@/views/auth/Login";
import Signup from "@/views/auth/Signup";

Vue.use(Router);

export default new Router({
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
      component: AddSmoothie
    },
    {
      path: "/edit-smoothie",
      name: "EditSmoothie",
      component: EditSmoothie
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
