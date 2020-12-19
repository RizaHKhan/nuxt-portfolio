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
  editHistoryItem(state, history) {
    Object.assign(state.history[history.index], history.item)
  },
  addHistoryItem(state, history) {
    state.history.push(history)
  },
}

export const getters = {
  getHistory: (state) => [...state.history].sort((a, b) => a.order - b.order),
}
