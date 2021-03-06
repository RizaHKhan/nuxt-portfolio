export const state = () => ({
  username: process.env.USERNAME,
  expertOf: process.env.EXPERTOF,
  projects: [],
  components: [
    {
      name: 'Name',
      img: require('~/assets/images/generic/landing.jpg'),
      height: '100vh',
    },
    {
      name: 'About',
    },
    { name: 'History', bgColor: 'grey darken-4' },
    { name: 'Projects', bgColor: 'blue-grey darken-4' },
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
  history: [
    {
      color: 'cyan',
      year: '2019 August',
      title: 'Got my first Upwork client',
      description:
        "After months of bidding on jobs, got my first contract. Client had misplaced their password and needed their small business website rebuilt. I took the opportunity and managed to get a 5/5 star review.',",
    },
    {
      color: 'green',
      year: '2019 September',
      title: 'Second Upwork Contract',
      description:
        'Same client needed another website rebuilt. I really expanded my skills here by creating a brand new theme from scratch. Wonderful learning experience',
    },
    {
      color: 'pink',
      year: '2019 Ocotober',
      title: 'Broadstreet Ads',
      description:
        'Joined a ad agency based out of New York, US. An amazing experience that exposed me to many new technologies. Had to come upto speed with Ruby On Rails, VueJS. Also involved with lots of vanilla Javascript while building ad formats. Great experience, will always be indebted to Kenny.',
    },
    {
      color: 'amber',
      year: '2020 September',
      title: 'Redman Technologies',
      description:
        'After my Broadstreet Ads contract ended I got a brief contract with a technology company out in Alberta. Great experience working on their VueJS application. Stressful but I go through it with flying colors.',
    },
    {
      color: 'orange',
      year: '2020 October',
      title: 'Passageways',
      description:
        'An eight month long contract that really exposed me to VueJS at a production level on a daily basis. Fast paced and stressful, this was the best experience of my live. A great experience!',
    },
    {
      color: 'red',
      year: '2021 May',
      title: 'Mass5',
      description:
        'A step up, I got a position that involves me managing everything about the project. From the coe, testing and how everything with be structured. This is going to be by far the best opportunity to show myself as a project manager and not just an employee',
    },
  ],
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
}
