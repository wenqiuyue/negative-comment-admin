import Vue from "vue";
import Vuex from "vuex";
import type from '../commons/type';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    siteInfo:null
  },
  mutations: {
    //后台登录
    login(state, payload) {
      state.token = payload;
    },
    //后台登出
    logout(state) {
      state.token = null;
    },
    getSite(state, payload) {
      state.siteInfo = payload;
    }
  },
  actions: {
    
    login({ commit }, token) {
      localStorage.setItem(type.TOKEN,token);
      if (token && token !== "null") commit("login", token);
    },
    logout({ commit }) {
      localStorage.removeItem(type.TOKEN);
      localStorage.removeItem(type.USER);
      commit("logout");
    },

    getSite({ commit }, siteInfo) {
      if (siteInfo && siteInfo !== "null") commit("getSite", siteInfo);
    },
  },
  modules: {}
});
