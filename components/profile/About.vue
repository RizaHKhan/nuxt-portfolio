<template>
  <v-container class="fill-height my-5 py-5">
    <v-row class="fill-height d-flex align-end">
      <v-col>
        <v-row>
          <v-col>
            <p class="text-h3 orange--text">Who I am</p>
            <p class="text-body-2 white--text">
              Front-end developer located in Canada, I've been working as a
              freelancer on Upwork for a couple of years now.
            </p>
            <p class="text-body-2 white--text">
              I cut my teeth creating Wordpress themes but eventually moved into
              Javascript development. When I discovered VueJS I was hooked and
              here we are.
            </p>
            <p class="text-body-2 white--text">
              I also enjoy learning about and then blogging about what I've
              learnt.
            </p>
          </v-col>
        </v-row>
        <v-row>
          <p class="orange--text text-h3">What I can do:</p>
          <v-expansion-panels accordion>
            <v-expansion-panel v-for="(skill, i) in skills" :key="i">
              <v-expansion-panel-header class="text-h6 font-weight-thin">{{
                skill.title
              }}</v-expansion-panel-header>
              <v-expansion-panel-content class="text-body-2">
                {{ skill.description }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      skills: (state) => state.user.skills,
    }),
  },
}
</script>

<style lang="scss" scoped></style>
