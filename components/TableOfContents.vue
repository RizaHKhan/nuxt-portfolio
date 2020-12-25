<template>
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
    <v-list-item>
      <v-list-item-content class="pb-5 text-center">
        <v-btn class="orange black--text" @click="goBack">Back</v-btn>
      </v-list-item-content>
    </v-list-item>
    <v-list nav dense>
      <v-subheader v-if="doc.toc" class="orange--text"
        >Table Of Contents</v-subheader
      >
      <v-list-item-group v-if="doc.toc" color="primary">
        <NuxtLink v-for="(item, i) in doc.toc" :key="i" :to="`#${item.id}`">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title :class="item.depth === 3 ? 'ml-3' : ''">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </NuxtLink>
      </v-list-item-group>
      <v-subheader v-if="$route.name === 'blog-slug'" class="orange--text"
        >Related Articles</v-subheader
      >
      <v-list-item-group v-if="$route.name === 'blog-slug'" color="primary">
        <NuxtLink
          v-if="prev"
          :to="{ name: 'blog-slug', params: { slug: prev.slug } }"
          class="white-text"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ prev.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </NuxtLink>
        <NuxtLink
          v-if="next"
          :to="{ name: 'blog-slug', params: { slug: next.slug } }"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ next.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </NuxtLink>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      username: (state) => state.user.username,
      expertOf: (state) => state.user.expertOf,
    }),
    doc() {
      return this.$route.name === 'blog-slug'
        ? this.$store.state.blog.blog
        : this.$store.state.project.project
    },
    prev() {
      if (this.$route.name === 'blog-slug') {
        return this.$store.state.blog.prev
      } else {
        return null
      }
    },
    next() {
      if (this.$route.name === 'blog-slug') {
        return this.$store.state.blog.next
      } else {
        return null
      }
    },
  },
  methods: {
    goBack() {
      this.$router.push('/blog')
    },
  },
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: white;
}
</style>
