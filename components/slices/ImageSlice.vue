<template>
  <prismic-image height="300" width="300" :field="slice.primary.image" />
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
