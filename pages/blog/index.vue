<template>
  <v-container>
    <v-card v-for="(blog, i) in blogs" :key="i" class="ma-2" outlined>
      <v-card-title class="font-weight-light">{{
        blog.data.title[0].text
      }}</v-card-title>
      <v-card-subtitle>{{ blog.data.category.slug }}</v-card-subtitle>
      <div v-for="(slice, x) in blog.data.body" :key="x">
        <v-card-text v-if="slice.slice_type === 'text'">
          <prismic-rich-text
            class="textslice"
            :field="slice.primary.text"
          ></prismic-rich-text>
        </v-card-text>
        <prismic-image
          v-if="slice.slice_type === 'image'"
          height="300"
          width="300"
          :field="slice.primary.image"
        />
        <v-card-text
          v-if="slice.slice_type === 'quote'"
          class="text-h5 font-weight-light"
        >
          <blockquote>
            {{ $prismic.asText(slice.primary.quote) }}
          </blockquote>
        </v-card-text>
        <ImageGallery
          v-if="slice.slice_type === 'image_gallery'"
          height="300"
          width="300"
          :slice="slice"
        />
      </div>
    </v-card>
    <pre>{{ blogs }}</pre>
  </v-container>
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
