import Vue from 'vue';
import Vuex from 'vuex';

import api from '../api';
import axios from 'axios';

import * as types from './types';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: process.env.VUE_APP_ENV !== 'production',
  state: {
    data: [],
    error: {
      isError: false,
      message: ''
    },
    isLoading: false
  },

  getters: {
    getFileByFilename: state => filename => {
      return state.data.files[filename];
    },
  },

  mutations: {
    [types.SET_LOADING](state, payload) {
      state.isLoading = payload;
    },

    [types.SET_ERROR](state, payload) {
      state.error = payload;
    },

    [types.FETCH_DATA](state, payload) {
      state.data = payload.find(gist => gist.description === 'Created by Github Notes');
    },

    [types.CREATE_GIST](state, payload) {
      state.data.push(payload);
    },

    [types.FETCH_CONTENT](state, payload) {
      state.data.files[payload.filename].content = payload.content;
    },

    [types.CREATE_FILE](state, payload) {
      state.data.files = payload.files;
    },

    [types.REMOVE_FILE](state, payload) {
      state.data.files = payload.files;
    }
  },

  actions: {
    async [types.FETCH_DATA]({ commit, dispatch }) {
      commit(types.SET_LOADING, true);

      try {
        const res = await api.get('/gists');
        if (res.data.length > 0) {
          commit(types.FETCH_DATA, res.data);
        } else {
          dispatch(types.CREATE_GIST);
        }
      } catch (e) {
        console.log(e);
      } finally {
        commit(types.SET_LOADING, false);
      }
    },

    [types.CREATE_GIST]({ commit, dispatch }) {
      let data = {
        "description": "Created by Github Notes",
        "public": true,
        "files": {
          "welcome.txt": {
            "content": "welcome gist file"
          },
        }
      };

      commit(types.SET_LOADING, true);

      return api.post('/gists', data)
        .then(res => {
          commit(types.CREATE_GIST, res.data);
          dispatch(types.FETCH_DATA);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          commit(types.SET_LOADING, false);
        })
    },

    [types.FETCH_SELECTED_CONTENT]({ commit }, param) {
      commit(types.SET_LOADING, true);

      return axios.get(param.raw_url)
        .then(res => {
          commit(types.FETCH_CONTENT, {
              filename: param.filename,
              content: res.data
            }
          );
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          commit(types.SET_LOADING, false);
        });
    },

    [types.CREATE_FILE]({ commit }, param) {
      let gist = this.state.data;
      let data = {
        "description": gist.description,
        "public": gist.public,
        "files": {
          [param.name]: {
            "content": param.content
          },
        }
      };

      commit(types.SET_LOADING, true);

      return api.post(`/gists/${gist.id}`, data)
        .then(res => {
          commit(types.CREATE_FILE, res.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          commit(types.SET_LOADING, false);
        })
    },

    async [types.REMOVE_FILE]({ commit }, param) {
      let gist = this.state.data;
      let data = {
        "description": gist.description,
        "public": gist.public,
        "files": {
          [param.filename]: null
        }
      };

      commit(types.SET_LOADING, true);

      try {
        const res = await api.post(`/gists/${gist.id}`, data);
        commit(types.REMOVE_FILE, res.data)
      } catch (e) {
        console.log(e);
      } finally {
        commit(types.SET_LOADING, false);
      }
    }
  }
});
