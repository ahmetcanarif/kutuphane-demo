import axios from "axios";
import { Promise } from "core-js";
import { userToken } from "../service/token.js";
const state = {
  user: {},
  user_token: userToken || ""
};
const getters = {
  getUser: state => state.user,
  isAuth: state => !!state.user_token
};
const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_AUTH(state) {
    state.user_token = userToken;
  },
  CLEAR_USER(state) {
    state.user = [];
    state.user_token = "";
  },
  CLEAR_TOKEN() {
    localStorage.removeItem("user_token");
  }
};
const actions = {
  async getUser({ commit }, payload) {
    return await new Promise((resolve, reject) => {
      const { username, password } = payload;
      axios
        .post("http://localhost/api/signIn.php", {
          username: username,
          password: password
        })
        .then(res => {
          resolve(res.data);
          if (!res.data.error) {
            localStorage.setItem("user_token", res.data.user.user_token);
            commit("SET_USER", res.data.user);
            commit("SET_AUTH");
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async getUserReadBooks() {
    return await new Promise((resolve, reject) => {
      axios
        .post("http://localhost/api/userBooks.php", {
          token: localStorage.getItem("user_token")
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async updateProfil({ commit }, payload) {
    return await new Promise((resolve, reject) => {
      console.log(payload);
      const { ad_soyad, sifre } = payload;
      axios
        .post("http://localhost/api/updateProfil.php", {
          token: userToken,
          ad: ad_soyad,
          sifre
        })
        .then(res => {
          resolve(res.data);
          console.log(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async changePassword({ commit }, payload) {
    return await new Promise((resolve, reject) => {
      axios
        .post("http://localhost/api/updateProfil.php", {
          action: "changePass",
          payload: payload,
          token: userToken
        })
        .then(res => {
          resolve(res.data);
          console.log(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async getTokenUser({ commit }, payload) {
    const token = payload;
    await axios
      .post("http://localhost/api/signIn.php", {
        token
      })
      .then(res => {
        commit("SET_USER", res.data.user);
        commit("SET_AUTH");
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
