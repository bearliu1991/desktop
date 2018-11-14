/**
 * 客服列表相关状态
 */
import Common from '@/js/public'
import Path from '@/api/chatPath'
const state = {
  services: {}, // 所有客服列表
  groups: {} // 所有分组列表
}

const getters = {
  getServices: state => state.services,
  getGroups: state => state.groups
}

const mutations = {
  SERVICES(state, data) {
    state.services = data
  },
  GROUPS(state, data) {
    state.groups = data
  }
}
const actions = {
  ajaxServices({commit}, id) {
    if (id !== undefined) {
      if (!Object.keys(state.services).length) {
        Common.httpPost(Path.services, {id: id}).then((res) => {
          let data = res.data
          if (data.code === 1) {
            commit('SERVICES', data.data)
          }
        })
      }
    }
  },
  ajaxGroups({commit}, id) {
    if (id !== undefined) {
      if (!Object.keys(state.groups).length) {
        Common.httpPost(Path.groups, {id: id}).then((res) => {
          let data = res.data
          if (data.code === 1) {
            commit('GROUPS', data.data)
          }
        })
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
