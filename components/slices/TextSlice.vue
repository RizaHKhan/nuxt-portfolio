<template>
  <v-card-text>
    <prismic-rich-text :field="slice.primary.text"></prismic-rich-text>
  </v-card-text>
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

<style lang="scss" scoped></style>
