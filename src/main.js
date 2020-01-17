import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "vue-moment";
Vue.use(moment);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
