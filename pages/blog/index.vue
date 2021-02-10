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
            class="orange black--text"
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
import ImageGallery from '@/components/slices/ImageGallery'

export default {
  components: {
    ImageGallery,
  },
  async asyncData({ $prismic }) {
    const blogs = await $prismic.api.query(
      $prismic.predicates.at('document.type', 'blog')
    )
    return { blogs: blogs.results }
  },
}
</script>
