<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="text-h3 orange--text">Projects</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(project, index) in projects"
        :key="index"
        cols="12"
        md="6"
        lg="4"
      >
        <v-hover v-slot="{ hover }">
          <NuxtLink
            :to="{ name: 'projects-slug', params: { slug: project.slug } }"
          >
            <v-card
              :class="{ grow: hover }"
              class="mx-auto grey darken-4"
              max-width="600"
              flat
            >
              <v-img
                :src="require(`~/assets/images/${project.previewImage}`)"
              ></v-img>
              <v-card-title class="text-h5 font-weight-light orange--text">{{
                project.title
              }}</v-card-title>
              <v-card-text class="text--primary">
                <p class="text-body-2">{{ project.description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn class="orange black--text">Read More</v-btn>
              </v-card-actions>
            </v-card>
          </NuxtLink>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      projects: (state) => state.user.projects,
    }),
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.v-card {
  transition: all 0.5s ease;
}
</style>
