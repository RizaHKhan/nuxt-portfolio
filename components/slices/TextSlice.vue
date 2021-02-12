<template>
  <v-card-text>
    <prismic-rich-text
      v-if="slice.primary.text[0].type !== 'preformatted'"
      :field="slice.primary.text"
      :class="getClass(slice.primary.text[0].type)"
    ></prismic-rich-text>
    <vue-code-highlight
      v-else
      language="javascript"
      :class="getClass(slice.primary.text[0].type)"
    >
      <prismic-rich-text :field="slice.primary.text"></prismic-rich-text>
    </vue-code-highlight>
  </v-card-text>
</template>

<script>
import { component as VueCodeHighlight } from 'vue-code-highlight'
import 'vue-code-highlight/themes/prism-twilight.css'

export default {
  components: { VueCodeHighlight },
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

<style lang="scss" scoped></style>
