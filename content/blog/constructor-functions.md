---
title: Javascript Constructor Functions and `this`
description: About constructor functions in the context of NodeJS and MongoDB models
previewImage: generic/js-logo.png
categories:
  - Javascript
published: true
---

# Constructor Functions

Constructor functions are a great way to create new `objects`.

We create a user below:

```javascript
let User = function (data) {
  this.data = data
}
```

## Prototype and context

You can then tack on additional functions to this constructor using the `prototype` property. You would do this if you need the data values in those functions.

```javascript
User.prototype.login = function () {
  // I have access to data with the this keyword
}
```

**IMPORTANT** Do not use arrow functions. Using arrow functions will change the context of `this` from the constructor function to the global object, where `data` is not available.

## Adding unrelated functions

Where you do **not** need the data property and just want to perform a search in the database for a document say. In this case, you don't need the prototype property and can just add the function directly to the User object.

```javascript
User.findByEmail = function (email) {
  // I do not have access to the data property. I'm just a additional function that doesn't need to know that information.
}
```

Here the `this` keyword does not refer to the user.

Below is an example showcasing what `this` refers to depending on which function calls it:

<dynamic-image filename="constructors/constructor-function.png"></dynamic-image>
