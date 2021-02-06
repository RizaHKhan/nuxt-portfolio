---
title: MongoDB Test Pre
previewImage: generic/mongodb-logo.png
published: true
categories:
  - MongoDB
---

# MongoDB Test Prep

Per the docs, there are a few requirements:

1. Philosophy and Features

- Performance
- JSON
- BSON
- Fault Tolerance
- Disaster Recovery
- Horizontal Scaling
- Mongo Shell

2. CRUD

- Create
- Read
- Update
- Delete

3. Data Modeling

- Embedding
- References
- Document Growth
- Modeling one-to-one and one-to-many relationships
- Modeling for atomic operations
- Modeling Tree Structures

4. Indexing and Performance

- Single Key
- Compound
- Multi-key
- Mechanics
- Storage Engines
- Performance

5. Aggregation

- Pipeline
- Operators
- Memory Usage
- Sort
- Skip
- Limit

6. Replication

- Configuration
- Oplog Concepts
- Write Concern
- Elections
- Failover
- Deployment to multiple data centers

7. Sharding

- Components
- When to shard
- Balancing
- Shard Keys
- Hashed Shard Keys

## 5. Aggregation

### \$addFields

```
{ $addFields: { <newField>: <expression>, ... } }
```

## 7. Sharding

All about scaling! If vertical scaling (better equipment) is no longer possible, you need to do some horizontal scaling.

Just increase the # of servers. Then a Router is used, that directs the query to which shard contains the desired datcontains the desired data.

Choose your shard key wisely. How does querying work with sharding?

`mongos` directs the query where to look. If shard key is not sent, then all shards are checked for data. A query with a shard key is quite faster.

### \$addToSet

Returns an array of all unique values that results from applying an expression to each document in a group of documents that share the same group by key. Order of the elements in the output array is unspecified.

```
$addToSet: <expression>
```

### \$slice

Works much like the `slice()` method in Javascript.

