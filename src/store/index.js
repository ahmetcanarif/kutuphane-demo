import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// IMPORT MODULES FİLE
import Book from "./modules/books";
import User from "./modules/user";
import Info from "./modules/info";

export default new Vuex.Store({
  modules: { Book, User, Info }
});
