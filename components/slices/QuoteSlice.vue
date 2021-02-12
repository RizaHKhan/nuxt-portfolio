<template>
  <v-card-text class="text-h5 font-weight-light">
    <blockquote>{{ $prismic.asText(slice.primary.quote) }}</blockquote>
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
