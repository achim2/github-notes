import Vue from 'vue';
import Vuex from 'vuex';

import api from '../api';
import axios from 'axios';

import * as mutationTypes from './types/mutationTypes';
import * as actionTypes from './types/actionTypes';

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
    getSpecificGist: state => {
      let data = state.data.filter(data => data.description === 'Created by Github Notes');
      return data[0];
    }
  },

  mutations: {
    [mutationTypes.SET_LOADING](state, payload) {
      state.isLoading = payload;
    },

    [mutationTypes.SET_ERROR](state, payload) {
      state.error = payload;
    },

    [mutationTypes.FETCH_DATA](state, payload) {
      state.data = payload;
    },

    [mutationTypes.CREATE_GIST](state, payload) {
      state.data.push(payload);
    },

    [mutationTypes.FETCH_CONTENT](state, payload) {
      state.selectedContent = payload;
    }
  },

  actions: {
    [actionTypes.FETCH_DATA]({commit, dispatch}) {
      commit(mutationTypes.SET_LOADING, true);

      api.get('/gists')
        .then(res => {

          if (res.data.length > 0) {
            commit(mutationTypes.FETCH_DATA, res.data);
          } else {
            dispatch(actionTypes.CREATE_GIST);
          }
        })
        .catch(err => {
          console.log(err);
        });

      commit(mutationTypes.SET_LOADING, false);
    },

    [actionTypes.CREATE_GIST]({commit}) {
      let data = {
        "description": "Created by Github Notes",
        "public": true,
        "files": {
          "welcome.txt": {
            "content": "ja gist under github notes"
          },
        }
      };

      api.post('/gists', data)
        .then(res => {
          commit(mutationTypes.CREATE_GIST, res.data);
        })
        .catch(err => {
          console.log(err);
        })
    },

    [actionTypes.FETCH_SELECTED_CONTENT]({commit}, param) {
      axios.get(param)
        .then(res => {
            commit(mutationTypes.FETCH_CONTENT, res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
