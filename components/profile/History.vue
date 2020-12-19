<template>
  <div v-if="!errors">
    <p class="display-3 orange--text text-center">History</p>
    <v-timeline class="my-5">
      <v-timeline-item
        v-for="(date, i) in sortedHistory"
        :key="i"
        :color="date.color"
        small
      >
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-bold ${date.color}--text`"
            v-text="date.year"
          ></span>
        </template>
        <div class="py-4">
          <h2 :class="`headline font-weight-light mb-4 ${date.color}--text`">
            {{ date.title }}
          </h2>
          <div class="text-body-1">
            {{ date.description }}
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
  <div v-else>
    <p class="display-2 red--text text-center pa-5">
      An Error occured while uploading history data
    </p>
    <p class="display-1 orange--text text-center pa-5">
      Please try again later
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  async fetch() {
    try {
      const response = await axios.get(`${process.env.API}/history`)
      this.$store.commit('user/addHistory', response.data)
    } catch (error) {
      this.errors = true
    }
  },
  data() {
    return {
      errors: false,
    }
  },
  computed: {
    ...mapGetters({
      sortedHistory: 'user/getHistory',
    }),
  },
}
</script>

<style></style>
