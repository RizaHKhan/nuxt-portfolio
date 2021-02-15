<template>
  <v-container>
    <v-card class="ma-2" outlined>
      <v-card-subtitle class="d-flex justify-end">{{
        blog.data.release_date
      }}</v-card-subtitle>
      <template v-for="(slice, i) in blog.data.body">
        <TextSlice v-if="slice.slice_type === 'text'" :key="i" :slice="slice" />
        <ImageSlice
          v-if="slice.slice_type === 'image'"
          :key="i"
          :slice="slice"
        />
        <QuoteSlice
          v-if="slice.slice_type === 'quote'"
          :key="i"
          :slice="slice"
        />
        <ImageGallerySlice
          v-if="slice.slice_type === 'image_gallery'"
          :key="i"
          height="300"
          width="300"
          :slice="slice"
        />
      </template>
    </v-card>
  </v-container>
</template>

<script>
import ImageGallerySlice from '@/components/slices/ImageGallerySlice'
import TextSlice from '@/components/slices/TextSlice'
import ImageSlice from '@/components/slices/ImageSlice'
import QuoteSlice from '@/components/slices/QuoteSlice'

export default {
  components: {
    ImageGallerySlice,
    TextSlice,
    ImageSlice,
    QuoteSlice,
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
