<template>
  <v-layout column class="ma-2">
    <v-col class="d-flex flex-column justify-center">
      <prismic-image :field="slice.primary.image" class="img" />
    </v-col>
    <v-col>
      <prismic-rich-text
        :field="slice.primary.caption"
        class="caption"
      ></prismic-rich-text>
    </v-col>
  </v-layout>
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
