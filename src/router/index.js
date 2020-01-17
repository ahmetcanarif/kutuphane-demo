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
      },
      {
        path: "popular",
        component: () => import("../components/PopularBook.vue")
      },
      {
        path: "readbook/:id",
        component: () => import("../components/deneme.vue")
      }
    ]
  },
  {
    path: "/profile",
    component: () => import("../views/Profile.vue"),
    beforeEnter(to, from, next) {
      if (localStorage.getItem("user_token")) {
        next();
      } else {
        next("/");
      }
    },
    children: [
      {
        path: "",
        component: () => import("../components/ReadBookUser.vue")
      },
      {
        path: "setting",
        component: () => import("../components/UserSettings.vue")
      }
    ]
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/Signup.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
