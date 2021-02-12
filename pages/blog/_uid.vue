<template>
  <v-container>
    <v-card class="ma-2" outlined>
      <v-card-title class="text-h4 font-weight-light">{{
        blog.data.title[0].text
      }}</v-card-title>
      <v-card-subtitle>{{ blog.data.release_date }}</v-card-subtitle>
      <div v-for="(slice, x) in blog.data.body" :key="x">
        <v-card-text v-if="slice.slice_type === 'text'">
          <prismic-rich-text :field="slice.primary.text"></prismic-rich-text>
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
          <blockquote>{{ $prismic.asText(slice.primary.quote) }}</blockquote>
        </v-card-text>
        <ImageGallery
          v-if="slice.slice_type === 'image_gallery'"
          height="300"
          width="300"
          :slice="slice"
        />
        <v-card v-if="slice.slice_type === 'code'" outlined>
          <prismic-rich-text :field="slice.primary.code"></prismic-rich-text>
        </v-card>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import ImageGallery from '@/components/slices/ImageGallery'

export default {
  components: {
    ImageGallery,
  },
  async asyncData({ $prismic, params }) {
    try {
      const blog = await $prismic.api.getByUID('blog', params.uid)
      return { blog }
    } catch (e) {
      return { e }
    }
  },
}
</script>
