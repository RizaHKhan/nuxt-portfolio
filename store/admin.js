export const state = () => ({
  activeComponent: 'History',
  loading: true,
})

export const mutations = {
  setActiveComponent(state, component) {
    if (state.activeComponent === component) return
    state.activeComponent = component
  },
  toggleLoadingState(state, toState) {
    console.log('making sure this works')
    state.loading = toState
  },
}

export const getters = {
  getLoadingState: (state) => state.loading,
}
