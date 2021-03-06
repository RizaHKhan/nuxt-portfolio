---
title: Nuxt Content Adding a category sort
previewImage: generic/puppeteer-logo.png
categories:
  - VueJS
  - Nuxt
published: true
---

# Setting up the application

So you've setup a Nuxt Content application where you want to write about various stuff. In my opinion, Nuxt Content really shines for technical documentatio like blogs.

Regardless, you might want to add categories to search/filter by. This is not a native feature of Nuxt Content, however, it can easily be implemented using a little bit of Javascript and VueJS knowledge.

## Blog setup

The first thing you will want to do is actually create a `categories` section in your blog. You can do that like so:

```javascript
title: My Blogs title
description: My Blogs great description
categories:
  - Cat 1
  - Cat 2
```

You can create an array by simply using the above syntax. You don't have to use an array but it will definitely make things easier should you want to add additional categories to a single page in the future.

Now in the `index.vue` file, we wil be using `$content` to get an array of blogs to display as a list. Here we can also pull a number of header items, including the `categories`.

```javascript
asyncData({ $content, params }) {
  const blogs = await $content('blog', params.slug)
    .only([
      'title'
      'description'
      'categories'
    ])
    .sortBy('title', 'desc')
    .fetch()

  return blogs
},

```

This will return to us an array of blogs which we can filter by. But lets not get a head of ourselves. Lets pull out all the categories for the blogs array.

For that we wll need a computed value:

```javascript
categories() {
  let categories = []
  this.blogs.forEach(blog => blog.categories.forEach(category => categories.push(category)))
  return categories = [...new Set(categories)]
}
```

The `Set` method helps us to remove any duplicates.

Now that we have categories, why don't we act like professional VueJS developers and pass that as a prop to a component called... `BlogCategories`? While we set it up, lets also listen for category selectors event via an `$emit`.

```javascript
<input v-model="searchQuery" />
<BlogCategories :categories="categories" @selectCategory="setCategoryToSelection" />

// script section here

data () {
  return {
    category: '',
    searchQuery: '' // this will be bound to a input, where you can type a blogs title
  }
},
methods: {
  setCategoryToSelection(category) {
    this.category = category
  }
Feel free to contact me and

},
computed: {
  filteredBlogs() {
    return this.category ?
      this.blogs.filter(blog => blog.title.toLowerCase().includes(this.searchQuery) && blog.categories.includes(this.category) :
      this.blogs.filter(blog => blog.title.toLowerCase().includes(this.searchQuery))
  }
}

```

Now lets take a quick peek at our new Categories component and see how we can set it up for optimal funtionality.

```javascript
<template>
  <div>
    <button
      v-for="(category, index) in categories"
      :key="index"
      @click="handleCategorySelection(category)"
      :class="selectedCategory ? 'bg-'red' : 'bg-grey'"
    >{{ category }}</button>
  </div>
</template>

<script>
props: {
  categories: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: String,
    required: false
  }
},
methods: {
  handleCategorySelection(category) {
  if (category === this.selectedCategory) {
      this.$emit('selectCategory', '') // see above for how the parent will handle this emitted value
    } else {
      this.$emit('selectCategory', category)
    }
  }
}
</script>
```

So a couple of clarifications.

1. If you click the a category that is already selected, it will unselect it.
2. If a new category is selected, it will emit that value to its parent element.

Now you have a circular relationshiop between the parent and child.

The child tells the parent which category of blogs to show. The parent then sents back that value and the child highlights that category as the one that is selected.
This makes for quite succcient code, and most importantly, **reuseable**.

Hope you enjoyed the article! Thanks for reading.
