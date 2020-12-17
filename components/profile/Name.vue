<template>
  <v-container class="fill-height">
    <v-row class="fill-height d-flex align-end">
      <v-col cols="12">
        <h2 class="white--text text-right text-upper text-h4">
          {{ username }}
        </h2>
        <p class="orange--text text-right text-h3">{{ expertOf }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      username: (state) => state.user.username,
      expertOf: (state) => state.user.expertOf,
    }),
  },
}
</script>

<style lang="scss" scoped></style>
