<template>
  <v-layout wrap>
    <v-card
      v-for="(blog, i) in blogs"
      :key="i"
      transition="slide-x-transition"
      class="ma-2"
      outlined
      max-width="400px"
    >
      <nuxt-link :to="`/blog/${blog.uid}`" class="white--text">
        <v-card-title
          class="text-h4 font-weight-light orange--text d-flex justify-center"
          >{{ blog.data.title[0].text }}</v-card-title
        >
        <v-card-text class="text--secondary text-center">{{
          blog.data.caption[0].text
        }}</v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            v-for="(cat, catI) in filterCategoryName(blog.data.categories)"
            :key="catI"
            x-small
            rounded
            class="green"
          >
            {{ cat }}
          </v-btn>
        </v-card-actions>
      </nuxt-link>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ $prismic, redirect }) {
    try {
      const { results: blogs } = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'blog')
      )

      const { results: categories } = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'category')
      )

      return { blogs, categories }
    } catch (e) {
      redirect('/')
    }
  },
  methods: {
    filterCategoryName(blogCategories) {
      const catUid = blogCategories.map(({ category }) => category.uid)
      return this.categories
        .filter((cat) => catUid.includes(cat.uid))
        .map((cat) => cat.data.title[0].text)
    },
  },
}
</script>
