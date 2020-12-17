<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-text-field
          v-model="searchQuery"
          outlined
          label="Search Blogs"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="8">
        <v-row>
          <v-col
            v-for="(blog, index) in filteredBlogs"
            :key="index"
            cols="12"
            md="6"
          >
            <NuxtLink :to="{ name: 'blog-slug', params: { slug: blog.slug } }">
              <v-card outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline text--disabled">
                      {{ formatDate(blog.createdAt) }}
                    </div>
                    <v-list-item-title class="text-wrap">
                      {{ blog.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-avatar tile size="80">
                    <v-img
                      contain
                      :src="require(`~/assets/images/${blog.previewImage}`)"
                    ></v-img>
                  </v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                  <v-btn
                    v-for="(cat, i) in blog.categories"
                    :key="i"
                    outlined
                    rounded
                    text
                    x-small
                    class="grey"
                  >
                    {{ cat }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </NuxtLink>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <Categories
          :categories="categories"
          :selected-category="category"
          @select-category="selectCategory"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Categories from '@/components/Categories'

export default {
  components: {
    Categories,
  },
  async asyncData({ $content, params }) {
    const blogs = await $content('blog', params.slug)
      .where({ published: true })
      .only([
        'title',
        'createdAt',
        'slug',
        'previewImage',
        'categories',
        'published',
      ])
      .sortBy('updatedAt', 'desc')
      .fetch()

    const categories = []
    blogs.forEach((blog) =>
      blog.categories.forEach((category) => categories.push(category))
    )

    return {
      blogs: blogs.filter((blog) => blog.published),
      categories: [...new Set(categories)],
    }
  },
  data() {
    return {
      searchQuery: '',
      category: '',
    }
  },
  computed: {
    filteredBlogs() {
      return this.category
        ? this.blogs.filter(
            (blog) =>
              blog.title
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()) &&
              blog.categories.includes(this.category)
          )
        : this.blogs.filter((blog) =>
            blog.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
    },
  },
  methods: {
    selectCategory(category) {
      this.category = category
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.v-card__title {
  word-break: break-word;
}

.v-card {
  transition: all 0.5s ease;
}

.image-container {
  margin: auto;
}
</style>
