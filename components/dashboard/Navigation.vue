<template>
  <v-app-bar app color="grey darken-4" flat>
    <v-container class="py-0 fill-height">
      <v-btn
        v-for="link in links"
        :key="link"
        text
        @click="setActiveComponent(link)"
      >
        {{ link }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-responsive max-width="260">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        ></v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data: () => ({
    links: ['User', 'History', 'Projects'],
  }),
  methods: {
    ...mapMutations({
      setActiveComponent: 'admin/setActiveComponent',
    }),
  },
}
</script>
