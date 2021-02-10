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
        <v-img src=""></v-img>
        <v-card-title class="font-weight-light">{{
          blog.data.title[0].text
        }}</v-card-title>
        <v-card-actions>
          <v-btn
            v-for="(cat, cati) in filterCategoryName(blog.data.categories)"
            :key="cati"
            x-small
            rounded
            class="green"
          >
            {{ cat }}
          </v-btn>
        </v-card-actions>
      </nuxt-link>
    </v-card>
    <v-row>
      <v-col cols="6">
        <pre>{{ categories }}</pre>
      </v-col>
      <v-col cols="6">
        <pre>{{ blogs }}</pre>
      </v-col>
    </v-row>
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
