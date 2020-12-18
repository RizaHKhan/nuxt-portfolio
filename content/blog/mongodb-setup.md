---
title: MongoDB Setup In Express
previewImage: generic/mongodb-logo.png
published: true
categories:
  - MongoDB
---

# Setting up MongoDB In Express

So you've decided to use MongoDB with NodeJS. Good choice, since MongoDB is a great database to work with, especially considering their free tier database never expires!

## Setting up Express Server

Lets setup a basic server first and then we will establish a connection to the database.

```javascript
// app.js
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors()) // This is for axios calls that we will be making from the client side.
module.exports = app
```

Notice how we didn't call the `listen()` method on app? That is because we don't want to start the application if there is something wrong with our database since the entire point of connecting to the database is to retrieve data.

## Setting Up Database Connection

Now lets create a database file. Here we will only use MongoDB's client an ODM like Mongoose. I think the API for MongoDB is versatile and flexible enough that we don't need Mogoose.

The code to setup the database connection looks like this:

```javascript
require('dotenv').config()
const mongodb = require('mongodb')

mongodb.connect(
  process.env.CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err
    module.exports = client
    const app = require('../app') // or where ever it is located
    app.listen(process.env.PORT)
  }
)
```

## Exporting Database Client

We are exporting the client that we can use throughout the app.

So lets say we have a `userController` file that allows us to get data regarding users.

```javascript
const userCollection = require('../db').db().collection('users')

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await userCollection.find({}).toArray()
    res.send(users)
  },
}
```

Please note that the above function would be called from the router file. So the request could look something like this:

```javascript
router.get('/users', usersController.getAllUsers)
```

## Conclusion

Very simple process and extremely fast. MongoDB is definitely my choice for a database when creating a CRUD app.
