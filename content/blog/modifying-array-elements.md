---
title: Finding Objects in Arrays using indexOf and findIndex
description: Showcasing a few use cases of indexOf and findIndex
previewImage: generic/js-logo.png
published: true
categories:
  - Javascript
---

# Arrays and Objects

## Simple Arrays

Below are typical arrays:

```javascript
const stringArray = ['one', 'two', 'three']
const numArray = [1, 2, 3]
```

Lets perform some crud operations of the above arrays.

Delete an element:

```javascript
stringArray.splice(0, 1)
// after: stringArray  = ['two', 'three']
```

But how did we get the index of 0? What if I wanted to delete the word 'two' from the array but didn't know which index it was at?

Not to worry javascript had a couple of ways to find the index an element is within an array. `indexOf` and `findIndex`.

The difference between the two methods is quite simple:

`indexOf` takes in one value
`findIndex` returns a callback which returns the first index that has a truthy value.

Both will return -1 if the element you are searching for cannot be found in the array.

```javascript
const whereIsTwo = stringArray.indexOf('two')
// results in 1

const whereIstwo = stringArray.findIndex((x) => x === 'two')
// results in 1
```

Clearly for a simple array that contains strings or numbers, it would be better to use `indexOf`.

Now let us consider other changes to the array. We now know which index the item is, lets change its value to something else.

```javascript
stringArray[wherreIsTwo] = 'no longer two!'
```

## Objects in Arrays

Now lets get into more complex situations. We have arrays of objects:

```javascript
const myArray = [
  {
    name: 'John Doe',
    age: 30,
  },
  {
    name: 'Jimmy Dore',
    age: 50,
  },
  {
    name: 'Liz Warren',
    age: 70,
  },
]
```
Here we have an array of people and their ages. We ended up making a mistake and Liz Warren isn't 70 but rather 80. We want to correct this but we don't know her index in the array.

```javascript
const lizIndex = myArray.findIndex(i => i.name === 'Liz Warren')
myArray[lizIndex].age = 80
```
Quite straightforward!

