<template>
  <div>
    <p class="text-h3 orange--text text-center">History</p>
    <v-timeline class="my-5">
      <v-timeline-item
        v-for="(date, i) in history"
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
          <div class="text-body-2">
            {{ date.description }}
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      history: (state) => state.user.history,
    }),
  },
}
</script>

<style></style>
