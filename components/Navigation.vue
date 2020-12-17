<template>
  <v-list>
    <v-list-item two-line>
      <v-list-item-content class="pb-5 text-center">
        <v-list-item-title class="orange--text display-2">{{
          username
        }}</v-list-item-title>
        <v-list-item-subtitle class="text-h6 font-weight-light white--text">{{
          expertOf
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <NuxtLink
      v-for="(component, index) in components.filter(
        (component) => component.name != 'Name'
      )"
      :key="index"
      :to="{ path: '/', hash: '#' + component.name }"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            ><v-btn
              block
              depressed
              class="text-capitalize font-weight-light grey darken-4"
              >{{ component.name }}</v-btn
            ></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </NuxtLink>
    <NuxtLink to="/blog">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            ><v-btn
              block
              depressed
              class="text-capitalize font-weight-light grey darken-4"
              >Blog</v-btn
            ></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </NuxtLink>

    <v-list-item class="mb-2">
      <v-list-item-content>
        <SocialMedia />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import SocialMedia from '@/components/SocialMedia'

import { mapState } from 'vuex'
export default {
  components: {
    SocialMedia,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      components: (state) => state.user.components,
    }),
    path() {
      return this.$route.path
    },
    username: () => process.env.USERNAME,
    expertOf: () => process.env.EXPERTOF,
  },
}
</script>

<style lang="scss">
a {
  text-decoration: none;
}
</style>
