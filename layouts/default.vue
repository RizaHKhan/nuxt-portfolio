<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app class="py-1 grey darken-4">
      <Navigation />
    </v-navigation-drawer>
    <v-app-bar app class="hidden-lg-and-up">
      <v-app-bar-nav-icon
        class="orange--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main class="pt-lg-0">
      <v-container class="pa-0" fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation,
  },
  data: () => ({ drawer: null }),
}
</script>
<style lang="scss">
.grey {
  -webkit-box-shadow: 2px 2px 9px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 2px 9px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 2px 9px -2px rgba(0, 0, 0, 0.75);
}
</style>
