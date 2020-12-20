<template>
  <v-app id="dark">
    <Navigation />
    <v-main class="grey darken-3">
      <nuxt />
    </v-main>
    <Overlay />
  </v-app>
</template>

<script>
import Navigation from '@/components/dashboard/Navigation'
import Overlay from '@/components/dashboard/Overlay'
export default {
  components: {
    Navigation,
    Overlay,
  },
}
</script>
