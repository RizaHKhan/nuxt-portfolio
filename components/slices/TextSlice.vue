<template>
  <v-card-text>
    <prismic-rich-text
      :field="slice.primary.text"
      :class="getClass(slice.primary.text[0].type)"
    ></prismic-rich-text>
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
  methods: {
    getClass(type) {
      switch (type) {
        case 'preformatted':
          return 'code'
        case 'heading6':
          return 'heading'
        case 'heading2':
          return 'heading'
        case 'heading1':
          return 'heading'
        case 'paragraph':
          return 'paragraph'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.code {
  padding: 1rem;
  border: solid 1px white;
  border-radius: 10px;
}
</style>
