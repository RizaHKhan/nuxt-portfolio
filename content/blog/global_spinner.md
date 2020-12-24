---
title: Creating a global spinner
description: Creating a global component using the EventBus
previewImage: generic/vue-logo.jpg
published: true
categories:
  - VueJS
---

# Creating a Global Spinner Component

Consider that you have implemented a feature in your application that takes some time to complete. And you are not sure how long it takes. The user should be given a visual que that the process has been started and is being worked on. This will make it for a significantly better user experience.

## Creating the Parent (handler)

This component will be mounted in the `App.vue` file and will essentially hold(handle) the various components we pass to it. If we use this handler, we can create multiple components that we can pass and render through the handler. This will allow us to easily mount and unmount the child elements.

### Template

```javascript
<template>
  // This component is always mounted, do we show it is the question. Hence we use v-show instead of v-if
  <transition>
    <div v-show="showContainer">
      <component :is="componentName"></component>
    </div>
  </transition>
</template>
```

### Script

```javascript
export default {
  data() {
    return {
      showContainer: false,
      componentName: '',
    }
  },
  created() {
    EventBus.$on('showDialog', (params) => {
      this.componentName = params.componentName
    })

    EventBus.$on('closeDialog', () => {
      this.closeDialog()
    })
  },
  methods: {
    closeDialog() {
      this.componentName = ''
      this.showContainer = false
    },
  },
}
```

## Creating the child component

The most important part:

### Template

```javascript
<template>
  <div class="spinner">
    // Your choice on how you would want it animated!
    <SpinnerComponent />
    <p>{{ componentData.LoadingCopy }}</p>
  </div>
</template>
```

### Script

```javascript
<script>
export default {
  props: ['componentData'],
  data() {
    return {
      pollInterval: null,
    }
  },
  created() {
    this.pollInterval = window.setInterval(() => {
      this.checkClose();
    }, 1000)
  },
  destroyed() {
    if (this.pollInterval) {
      window.clearInterval(this.pollInterval)
    }
  },
  methods: {
    checkClose() {
      if (!this.componentData.CloseCondition || this.componentData.CloseCondition()) {
        this.$emit('closeDialog')
      }
    }
  }
}
</script>
```

## Registering the route

Finally lets register this route. In our case, we will lazy-load it using this syntax:

```javascript
Vue.component('LoadingDialog', () => {
  import(/* webpackChunkName: 'minutes' */ '../components/path/to/Spinner.vue')
})
```

## Final Words

We are leaving a lot of details out here. We didn't talk about styling at all. And we didn't touch on transitioning in and out of the component.
Those are important elements and should be addressed to make the users experience that much better!
