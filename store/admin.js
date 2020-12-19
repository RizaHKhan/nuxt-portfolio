export const state = () => ({
  activeComponent: 'History',
})

export const mutations = {
  setActiveComponent(state, component) {
    if (state.activeComponent === component) return
    state.activeComponent = component
  },
}
