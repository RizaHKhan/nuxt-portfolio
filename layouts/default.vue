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
    <v-main class="pt-lg-0 grey darken-4">
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
.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
