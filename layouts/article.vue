<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app class="py-1 grey darken-4">
      <TableOfContents />
    </v-navigation-drawer>
    <v-app-bar app class="hidden-lg-and-up">
      <v-app-bar-nav-icon
        class="orange--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main class="grey darken-4">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TableOfContents from '@/components/TableOfContents'
export default {
  components: {
    TableOfContents,
  },
  data: () => ({ drawer: null }),
}
</script>
