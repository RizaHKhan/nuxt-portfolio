---
title: Sanitizing Your Data Objects
description: A safeguard against information coming from the server.
previewImage: generic/vue-logo.jpg
categories:
  - VueJS
published: true
---

# Sanitizing Objects

It is always a good idea to do a quick check on what you are receiving as data, both from the backend and frontend.

For example, say you have received data via a `Axios` call that provides you with a object that contains numerous properties. You want to ensure that there are no malicious functions that could potentially cause issues in the front end.

Therefore, you can do a quick pass through a factory function that will check for a `typeof` on each property and remove anything suspicious.

```javascript
// factory function for (something random)
function Car(data) {
  let self = this;
  self.UpdateData(data);
}

Car.prototype.UpdateData = function (data) {
  let self = this;

  for (let property  in data) {
    if (Object.prototype.hasOwnProperty.call(data, property) && typeof data[property] !== 'function') {
      self[property] = data[property];
    }
  }
}

export default Car;
```

To explain the line `Object.prototype.hasOwnProperty.call(data, property)`. This is checking if the property (2nd parameter) exists in the object (first parameter).
It will return true if it exists and false if not.

So we're checking if the property exists but we are also checking if the `typeof` that property. If it is a function, then do not run the if block. That is, don't add it as a property of the object.

Thanks for reading!
