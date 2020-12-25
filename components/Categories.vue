<template>
  <v-row>
    <v-col cols="12">
      <h2 class="orange--text text-h6 font-weight-light">Categories</h2>
    </v-col>
    <v-col cols="12">
      <v-btn
        v-for="(category, index) in categories"
        :key="index"
        class="ma-1 orange--text blue-grey darken-4"
        small
        :class="selectedCategory === category ? 'primary' : ''"
        @click="selectCategory(category)"
      >
        {{ category }}</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
    selectedCategory: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    selectCategory(category) {
      if (category === this.selectedCategory) {
        this.$emit('select-category', '')
      } else {
        this.$emit('select-category', category)
      }
    },
  },
}
</script>

<style></style>
