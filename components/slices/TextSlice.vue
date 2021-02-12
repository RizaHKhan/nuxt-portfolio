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
  border: solid 1px red;
}

.heading {
  border-bottom: 1px white solid;
}

.paragraph {
  border: solid 1px blue;
}
</style>
