---
title: MongoDB Operators (all of them)
description: Going over MongoDB's logical operators
previewImage: generic/mongodb-logo.png
categories:
  - Database
published: true
---

# MongoDB Operators

MongoDB provides practice databases that you can get access to right in your cluster. With regards to the queries, I will spell out the target database and what information we are trying to retrieve.

<dynamic-image filename="mongodb/mongodb_1.png"></dynamic-image>

## Comparison Operators

### Less Then - \$lt

### Less Then or Equal - \$lte

### Greater Then - \$gt

### Greater Then or Equal - \$gte

## Logical Operators

### And \$and

```javascript
// Helps alot to write out the queries separated like this so you can clearly see where the brackets start/end.

db.companies
  .find({
    $and: [
      {
        $or: [
          {
            founded_year: 2004,
          },
          {
            founded_month: 10,
          },
        ],
      },
      {
        $or: [
          {
            category_code: 'web',
          },
          {
            category_code: 'social',
          },
        ],
      },
    ],
  })
  .count()
```

### Or - \$or

### Nor - \$nor

### Not - \$not

## Expression - \$expr

```javascript
db.companies.find({
  $expr: {
    $gt: [$number_of_employees, $founded_year],
  },
})
```

How many companies in the `sample_training.companies` collection have the same `permalink` as their `twitter_username`?

```javascript
db.companies
  .find({
    $expr: {
      $eq: ['$permalink', '$twitter_username'],
    },
  })
  .count()

// The issue I had went writing this query out was that, I didn't include quotes around the array items.
```

## Array Operators

### \$all

Matches arrays that contain all elements specified in the query.

Syntax: `{<field>: {$all: [<value1>,<value2>...]}}`

### \$elemMatch

Selects documents if element in the array field matches all the specified \$elemMatch conditions.

### \$size

Selects documents if the array field is a specified size.

```javascript
```

###
