---
title: Data Modeling in MongoDB
previewImage: generic/mongodb-logo.png
published: true
categories:
  - MongoDB
---

# Data Modeling in MongoDB

The correct model of a database will considerably enhance the performance of a application.

RAM, SSD's and HDD's
Data size and security and sovereignty

Security should be a consideration when modeling your data.

Network latency.
A document cannot be larger then 16MB. Atomicity of updates.

It may not be possible to keep your data in RAM.

Working Set:

> The total body of data that the application uses in teh course of normal operations.

Tips:

1. Keep the frequently used documents in RAM
2. Keep the indexes in RAM
3.

Model should be reevaluated and updated accordingly.

## Methodology

1. Workload
2. Relationships
3. Design patterns

Scenarios
Busines Domain Expert
Production Logs and Stats
Data Modeling Expert

Size the data and project the size in a few months to a few years.

Specify pieces of data.
How does the data relate to each other. 1 to 1 or 1 to many or many to many.

Schema design patterns.

1. Workload
2. Relationships
3. Patterns

### Steps of modeling

Simplicity vs Performance - Finding a balance between the two

Developing an application quickly. Limited expectations.

one-to-one
one-to-many
many-to-many

More simplicity - fewer collections

Performance apps use Sharding
Requires fast reads or a lot of operations.

More modeling upfront for larger projects with more people.

Operations per second. Pinning attributes queries.

CPU and Disk usage.

> It is easier to add optimizations later on, then to remove complexity from an application.

Simplicity > Performance

Identify
Embedding or linking

Simplicity will favor embedding

Business Domain Expert
Data Modeling Expert

Identify the most critical operations.

Anything that you don't want to lose, use durability `majority`.
Other information that is not critical use `1 node`

## Relationships

Common types:

1 - 1
1 - N
N - N

1 - Zillions - Big Data

Numeral Notation

1. Minimum
2. most likely, meian
3. Maximum

### One to Many

County 1

- city 1
- city 2
- city 3
- city 4

County 2

- city 1
- city 2
- city 3
- city 4

```javascript
county1: {
  city: [city1, city2, city3]
}

county2: {
  city: [city1, city2, city3]
}
```

### Many to Many

Duplication is better in some cases.

