// import { Dark } from 'quasar'
const state = {
  theme: null
}

const mutations = {
  SET_THEME (state, payload) {
    state.theme = payload
  }
}

const getters = {
  appTheme: state => state.theme
}

const actions = {
  GET_THEME ({ commit }) {
    const getTheme = JSON.parse(localStorage.getItem('theme'))
    commit('SET_THEME', getTheme)
  },
  CHANGE_THEME ({ commit }, payload) {
    // Dark.set(payload)
    localStorage.setItem('theme', JSON.stringify(payload))
    commit('SET_THEME', {
      theme: payload
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
