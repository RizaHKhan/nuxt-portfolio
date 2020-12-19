<template>
  <v-app id="dark">
    <Navigation />
    <v-main class="grey darken-3">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from '@/components/dashboard/Navigation'
export default {
  components: {
    Navigation,
  },
}
</script>
