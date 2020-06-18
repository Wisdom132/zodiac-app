const state = {
  color: ""
}
const getters = {
  mapColor: s => s.color
}
const mutations = {
  SET_MAP_COLOR: (state, color) => {state.color = color}
}

export default{
  namespaced: true,
  state,
  getters,
  mutations
}