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
export default {
  computed: {
    username: () => process.env.USERNAME,
    expertOf: () => process.env.EXPERTOF,
  },
}
</script>

<style lang="scss" scoped></style>
