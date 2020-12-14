---
title: Snackbar
description: Creating a Global Snackbar component in Vue3 /w tests
previewImage: generic/vue-logo.jpg
categories:
  - VueJS
published: true
---

# Vue 3 Snackbar component

Everytime you want to alert the user of an event (ie, an error has occured or a successful event has occured) you can add a small alert that appears briefly at the corner of the screen indicating said event.

Adding targeted colors that will also accentuate the type of message will also help clarify to the user what event just occured.

We'll dive into all that below and also add in tests for good measure.

## Basics

Before diving into the code, lets go through the basic steps:

1. Events occurs
2. Update store with new message
3. Message appears on screen
4. Disappears after a few seconds (and is replaced with another notification, if available)
5. After item has been shown, remove it from state

## Tests

We don't need something extensive. A couple of tests to ensure that the component will function as intended throughout the development of the app it will be used in.

1. It will output a message
2. It will have a close button
3. It will display the next message in queue
4. It will only render when there is a message to display

```javascript
// Tests
import { mount } from '@/tests/vuejs'
import Snackbar from '@/components/Snackbar.vue'
import { createStore } from 'vuex'

// initialize the store here
const snackbar = {
  state: () => ({
    messages: ['Message 1', 'Message 2'],
  }),
  mutations: {
    addNewMessage(state, message) {
      state.messages.push(message)
    },
    deleteShownMessage(state) {
      state.messages.pop()
    },
    removeAllMessages(state) {
      state.messages = []
    }
  },
  getters: {
    getFirstMessage: (state) => (state.messages[0] ? state.messages[0] : false);
  },
}

const store = createStore({
  modules: {
    snackbar
  }
})

describe('Snackbar.vue', () => {
  it('should render a message upon load and show the close button', () => {
    const wrapper = mount(Snackbar, {
      global: {
        plugins: [store]
      }
    })

    expect(wrapper.html().includes("Message 1")).toBe(true)
    expect(wrapper.html().includes("Close")).toBe(true)
  })

  it('should not render anything if there is no message in state', () => {
    // initialize the store here
    const snackbar = {
      state: () => ({
        messages: [],
      }),
      mutations: {
        addNewMessage(state, message) {
          state.messages.push(message)
        },
        deleteShownMessage(state) {
          state.messages.pop()
        },
      },
      getters: {
        getFirstMessage: (state) => (state.messages[0] ? state.messages[0] : false);
      },
    }

    const store = createStore({
      modules: {
        snackbar
      }
    })
    const wrapper = mount(Snackbar, {
      global: {
        plugins: [store]
      }
    })

    expect(wrapper.html().includes("")).toBe(true)
  })

  it('should show the next message after three seconds or button click', () => {
    // Work in progress
  })
})
```

## Developing the component

We'll be using the Composition API that is available in Vue 3. It improves on the Options API and will provide us with the ability to arrange our code in a more readable fashion.

The beauty of this component is that it involves the critical use of CSS to ensure we get the desired results.

### Mark up

```javascript
// components markup

<template>
  <div class="snackbar">
    <p class="snackbar__message">{{ message }}</p>
    <button class="snackbar__button" @click="clearTimer">Close Me</button>
  </div>
</template>
```

We don't need much: 1) Display message, 2) A way to close the snackbar quicker then the automatic timer's length.

### CSS

The CSS will really bring it home. For our example, we'll keep it simple.

```scss
.snackbar {
  position: absolute;
  display: flex;
  width: 200px;
  padding: 0.5rem;
  flex-direction: column;
  bottom: 10px;
  right: 10px;
  border: solid 1px black;
  border-radius: 5px;
  z-index: 1000;
}
```

This CSS will ensure the `Snackbar` is located in the bottom right of the screen and sits above all other elements (probably didn't need to use `z-index: 1000` :)).

### Script

We'll go through the Javascript code step by step so we're clear on what we are building.

We need to import some items from Vue and Vuex

```javascript
import { useStore } from 'vuex' // allows us to access the store
import { computed, watch } from 'vue' // allows us to create computed properties in Vue 3. The watch function allows us to 'watch' a variable for change
```

Next we'll do a quick setup in the `setup()` function. Setting up all the variables we will use and their values.

```javascript
const store = useStore()
let message = computed(() => store.getters['snackbar/latestMessage'])

// rest of the code goes here

return {
  message,
  clearTimer, // explained later
}
```

So to re-iterate, we want the message to show up, and after a few seconds disappear. We can achieve this by some kind of delay. In our case, we will use `promise`'s to achieve this

But before we get into that, we need to understanding something about Components and their life cycle.

Since we are placing this component at the very root of our application. It will mount immediately when the application starts.
This is fine because it is very light weight and doesn't handle a lot of data or logic.

We then need to know that the `setup()` method in the Composition API is called at the `beforeCreate` and `created` Options API methods would have been called.

The reason I emphasis this is because once the getter returns the value from the store, it will not automatically start the timer. We need to create and call such a function.

```javascript
// Call the function
changeMessage()

// Rest of the code goes here

// Define the function
async function changeMessage(fail) {
  try {
    if (fail) throw new Error() // This will call the code inside the catch block
    await new Promise(resolve => setTimeout(resolve, 3000)) // After three seconds resolve this Promise, which will call the next method
    store.commit('snackbar/removeShownMessage') // Removes the message currently being shown
  } else {
    store.commit('snackbar/removeAllMessages') // removes everything from the store's state which ends up closing the popup
  }
}
```

So we called the method and it will continue to chain until all the messages have been shown and removed from state.

The only thing is, that function is only called once and there is nothing there that will trigger it again. Therefore we use a `watch` method that will watch the value of `message` and if it changes, we can call `changeMessage` again.

```javascript
watch(async () => {
  await changeMessage()
})
```

And that folks is your global, reuseable snackbar! It can be called from anywhere with a mutations commit message and the store and component logic will take care of the rest.

## Enhancements

There are a couple of things that would enchance this component though:

1. Adding CSS transitions
2. Adding CSS transitions between the test changes
3. Adding background colors that will enhance the message presented. Perhaps a red color for danger/error.
