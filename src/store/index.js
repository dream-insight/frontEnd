import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    onPush: false,
    onPushMsg: [],
  },
  getters: {
    getOnPush(state) {
      return state.onPush
    },
    getPushMessage(state) {
      return state.onPushMsg
    }
  },
  mutations: {
    onPushToggle(state, bool) {
      state.onPush = bool
    },
    pushMessage(state, payload) {
      const { onPush, type, message } = payload

      state.onPush = onPush

      if (onPush) {
        state.onPushMsg.push({ type, message })
      }
    }
  },
  actions: {
    setPushMessage({ commit }, payload) {
      payload.onPush = true
      commit('pushMessage', payload)

      setTimeout(() => {
        commit('onPushToggle', false)
      }, 3000)
    }
  },
  modules: {
  }
})

export default store
