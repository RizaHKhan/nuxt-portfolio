<template>
  <v-container>
    <v-row justify="center">
      <v-col v-for="(media, index) in socialMedia" :key="index">
        <a :href="media.link" target="_blank">
          <v-icon color="white darken-2" class="mx-lg-3 mr-sm-3">
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
