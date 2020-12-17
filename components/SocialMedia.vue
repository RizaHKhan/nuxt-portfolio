<template>
  <v-container>
    <v-row>
      <v-col v-for="(media, index) in socialMedia" :key="index">
        <a :href="media.link" target="_blank" class="d-flex">
          <v-icon color="white darken-2" class="mx-auto">
            mdi-{{ media.name }}
          </v-icon>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      socialMedia: (state) => state.user.socialMedia,
    }),
  },
}
</script>
