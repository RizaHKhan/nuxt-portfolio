<template>
  <v-list class="d-flex flex-column justify-space-between fill-height">
    <div>
      <v-list-item two-line>
        <v-list-item-content class="pb-5 text-center">
          <NuxtLink to="/">
            <v-list-item-title class="orange--text display-2">{{
              username
            }}</v-list-item-title>
          </NuxtLink>
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
    </div>
    <v-list-item>
      <v-list-item-content class="mt-auto">
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
      username: (state) => state.user.username,
      expertOf: (state) => state.user.expertOf,
    }),
    path() {
      return this.$route.path
    },
  },
}
</script>

<style lang="scss">
a {
  text-decoration: none;
}
</style>
