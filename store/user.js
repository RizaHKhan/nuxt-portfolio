import axios from 'axios'

export const state = () => ({
  username: process.env.USERNAME,
  expertOf: process.env.EXPERTOF,
  projects: [],
  components: [
    {
      name: 'Name',
      img: require('~/assets/images/generic/landing.png'),
      height: '100vh',
    },
    {
      name: 'About',
    },
    { name: 'History', bgColor: 'grey darken-4' },
    { name: 'Projects', bgColor: 'grey darken-3' },
    {
      name: 'Contact',
    },
  ],
  socialMedia: [
    { name: 'earth', link: process.env.UPWORK },
    {
      name: 'linkedin',
      link: process.env.LINKEDIN,
    },
    { name: 'github', link: process.env.GITHUB },
  ],
  history: [],
  skills: [
    {
      title: 'Web Development',
      description:
        'Proficient with VueJS. All kinds of CSS frameworks and CSS in general. NodeJS and MongoDB for the backend.',
    },
    {
      title: 'QA',
      description:
        'I have been on both sides, where I have built features and had them go through the QA process and fix any issues found. I have also been a QA and tried to find issues.',
    },
    {
      title: 'Testing',
      description: 'Proficient with Jest and Testing Library.',
    },
    {
      title: 'Data Scrapping',
      description:
        'Proficient with Puppeteer to get data from websites that do not offer APIs.',
    },
  ],
})

export const mutations = {
  addProjects(state, payload) {
    state.projects = payload
  },
  addHistory(state, history) {
    state.history = history
  },
  deleteHistoryItem(state, index) {
    state.history.splice(index, 1)
  },
  updateHistoryItem(state, payload) {
    Object.assign(state.history[payload.index], payload.item)
  },
  addHistoryItem(state, history) {
    state.history.push(history)
  },
}

export const actions = {
  async deleteHistoryItem({ commit }, payload) {
    try {
      const response = await axios.delete(
        `${process.env.API}/history/${payload._id}`
      )
      if (response.status === 200) {
        commit('deleteHistoryItem', payload.index)
      }
    } catch (e) {
      console.log(e)
    }
  },
  async updateHistoryItem({ commit }, payload) {
    try {
      const response = await axios.put(
        `${process.env.API}/history/${payload.item._id}`,
        payload.item
      )
      if (response.status === 200) {
        commit('updateHistoryItem', payload)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async addHistoryItem({ commit }, history) {
    try {
      const response = await axios.post(`${process.env.API}/history`, history)
      commit('addHistoryItem', response.data)
    } catch (error) {
      console.log(error)
    }
  },
}

export const getters = {
  getHistory: (state) => [...state.history].sort((a, b) => a.order - b.order),
}
