import axios from "axios";
const state = {
  books: [],
  categories: [],
  popularBooks: [],
  lastBooks: []
};
const getters = {
  getBooks: state => state.books,
  getPopularBook: state => state.popularBooks,
  getLastBook: state => state.lastBooks,
  getCategory: state => state.categories
};
const mutations = {
  SET_BOOKS(state, books) {
    state.books = books;
  },
  SET_POPULAR_BOOKS(state, books) {
    state.popularBooks = books;
  },
  SET_LAST_BOOKS(state, books) {
    state.lastBooks = books;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  }
};
const actions = {
  async getData({ commit }) {
    await axios
      .get("http://localhost/api/allBooks.php")
      .then(res => {
        commit("SET_BOOKS", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  async getPopularBooks({ commit }) {
    await axios
      .get("http://localhost/api/popularBooks.php")
      .then(res => {
        commit("SET_POPULAR_BOOKS", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  async getLastBooks({ commit }) {
    await axios
      .get("http://localhost/api/lastBooks.php")
      .then(res => {
        commit("SET_LAST_BOOKS", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  async getCategory({ commit }) {
    await axios
      .get("http://localhost/api/categories.php")
      .then(res => {
        commit("SET_CATEGORIES", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
