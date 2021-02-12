<template>
  <v-row>
    <v-col class="ma-2 d-flex justify-center">
      <prismic-image :field="slice.primary.image" class="img" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    slice: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.img {
  max-width: 100%;
}
</style>
