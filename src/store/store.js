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
    isLoading: false,
    selectedContent: null
  },

  getters: {
    getFileByFilename: state => filename =>{
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
      let gists = payload.filter(gist => gist.description === 'Created by Github Notes');
      state.data = gists[0];
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
    async [types.FETCH_DATA]({commit, dispatch}) {
      commit(types.SET_LOADING, true);

      await api.get('/gists')
        .then(res => {

          if (res.data.length > 0) {
            commit(types.FETCH_DATA, res.data);
          } else {
            dispatch(types.CREATE_GIST);
          }
        })
        .catch(err => {
          console.log(err);
        });

      commit(types.SET_LOADING, false);
    },

    [types.CREATE_GIST]({commit}) {
      let data = {
        "description": "Created by Github Notes",
        "public": true,
        "files": {
          "welcome.txt": {
            "content": "welcome gist file"
          },
        }
      };

      api.post('/gists', data)
        .then(res => {
          commit(types.CREATE_GIST, res.data);
        })
        .catch(err => {
          console.log(err);
        })
    },

    [types.FETCH_SELECTED_CONTENT]({commit}, param) {
      return new Promise((resolve, reject) => {
        axios.get(param.raw_url)
          .then(res => {
            commit(types.FETCH_CONTENT, {
                filename: param.filename,
                content: res.data
              }
            );
            resolve()
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      })
    },

    [types.CREATE_FILE]({commit}, param) {
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

      return new Promise((resolve, reject) => {
        api.post(`/gists/${gist.id}`, data)
          .then(res => {
            commit(types.CREATE_FILE, res.data);
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject();
          })
      })
    },

    //Todo: the github needs few seconds to remove the file, so the page reload loads the file again that is already removed
    async [types.REMOVE_FILE]({commit}, param) {
      let gist = this.state.data;
      let data = {
        "description": gist.description,
        "public": gist.public,
        "files": {
          [param.filename]: null
        }
      };

      await api.post(`/gists/${gist.id}`, data)
        .then(res => {
          console.log(res);
          commit(types.REMOVE_FILE, res.data)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
});
