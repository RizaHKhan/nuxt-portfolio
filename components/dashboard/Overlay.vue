<template>
  <div v-if="loading">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      loading: 'admin/getLoadingState',
    }),
  },
}
</script>

<style></style>
