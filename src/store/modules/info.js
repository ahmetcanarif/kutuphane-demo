import axios from "axios";
const state = {
  info: []
};
const getters = {
  getInfo: state => state.info
};
const mutations = {
  SET_INFO(state, info) {
    state.info = info;
  }
};
const actions = {
  async getData({ commit }) {
    return await new Promise((resolve, reject) => {
      axios
        .post("http://localhost/api/info.php")
        .then(res => {
          commit("SET_INFO", res.data.info);
          resolve(res);
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
