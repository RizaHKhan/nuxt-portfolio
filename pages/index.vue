<template>
  <div>
    <v-container
      v-for="(component, index) in components"
      :id="component.name"
      :key="index"
      style="background-size: cover"
      :style="{
        backgroundImage: `url(${component.img ? component.img : ''})`,
        height: component.height,
      }"
      :class="component.bgColor"
      fluid
    >
      <component :is="component.name"></component>
    </v-container>
  </div>
</template>

<script>
import About from '@/components/profile/About'
import Name from '@/components/profile/Name'
import History from '@/components/profile/History'
import Contact from '@/components/profile/Contact'
import Projects from '@/components/profile/Projects'
import { mapState } from 'vuex'

export default {
  components: {
    About,
    Name,
    History,
    Contact,
    Projects,
  },
  layout: 'default',
  async asyncData({ $content, params, store }) {
    const projects = await $content('projects', params.slug)
      .only([
        'title',
        'updatedAt',
        'slug',
        'previewImage',
        'categories',
        'description',
      ])
      .sortBy('updatedAt', 'desc')
      .fetch()

    store.commit('user/addProjects', projects)
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      components: (state) => state.user.components,
    }),
  },
}
</script>

<style lang="scss" scoped></style>
