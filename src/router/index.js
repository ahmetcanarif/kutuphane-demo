import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "/book",
    component: () => import("../views/Book.vue"),
    children: [
      {
        path: "",
        component: () => import("../components/AllBooks.vue")
      },
      {
        path: ":id",
        component: () => import("../components/BookDetail.vue")
      }
    ]
  },
  {
    path: "/loading",
    name: "Loading",
    component: () => import("../components/Loading.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
