import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/Index";
import AddSmoothie from "@/views/AddSmoothie";
import EditSmoothie from "@/views/EditSmoothie";

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
    }
  ]
});
