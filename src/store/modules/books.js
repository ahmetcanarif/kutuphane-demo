import axios from "axios";
const state = {
  books: [],
  bookDetail: {},
  categories: [],
  popularBooks: [],
  lastBooks: []
};
const getters = {
  getBooks: state => state.books,
  getPopularBook: state => state.popularBooks,
  getLastBook: state => state.lastBooks,
  getCategory: state => state.categories,
  getBookDetail: state => state.bookDetail
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
  },
  SET_BOOK_DETAIL(state, book) {
    state.bookDetail = book;
  }
};
const actions = {
  async getData({ commit, getters }) {
    return await new Promise((resolve, reject) => {
      axios
        .post("http://localhost/api/books.php", {
          action: "allbooks"
        })
        .then(res => {
          commit("SET_BOOKS", res.data.books);
          //          console.log(getters.getBooks);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async getPopularBooks({ commit }) {
    return await new Promise((resolve, reject) => {
      axios
        .post("http://localhost/api/books.php", {
          action: "popularbook"
        })
        .then(res => {
          commit("SET_POPULAR_BOOKS", res.data.popularBooks);
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async getLastBooks({ commit }) {
    return await new Promise((resolve, reject) => {
      axios
        .post("http://localhost/api/books.php", {
          action: "lastbook"
        })
        .then(res => {
          commit("SET_LAST_BOOKS", res.data.lastBooks);
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async getCategory({ commit }) {
    return await new Promise((resolve, reject) => {
      axios
        .get("http://localhost/api/categories.php")
        .then(res => {
          commit("SET_CATEGORIES", res.data.category);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async getOneBook({ commit }, id) {
    return await new Promise((resolve, reject) => {
      axios
        .post("http://localhost/api/bookDetail.php", {
          id: id
        })
        .then(res => {
          commit("SET_BOOK_DETAIL", res.data.book);
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
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
