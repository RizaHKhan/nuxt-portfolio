---
title: MongoDB From Router To Response
previewImage: generic/mongodb-logo.png
published: true
categories:
  - MongoDB
  - NodeJS
---

# MongoDB From Router to Response

There is a supplement to MongoDB's Javascript course located on MongoDB University.

To give some context on the application, you are involved in building the backend of the API in NodeJS/Express and MongoDB.
Specifically, writing functions that hit the database.

## Route

We first hit the appropriate route when we are searching for a list of movies.

```javascript
router.route('/search').get(MoviesCtrl.apiSearchMovies)
```

## Controller

```javascript
  static async apiSearchMovies(req, res, next) {
    const MOVIES_PER_PAGE = 20

    // On most (all?) webpages, if you have filtered a large dataset, you don't ever see ALL the results in one gigantic list that you
    // scroll through. You will often see pagination where you can search for additional items.
    // The pages would be indicated in a query (ie, /moveislist?pages=2)
    let page
    try {
      page = req.query.page ? parseInt(req.query.page, 10) : 0
      // parseInts second parameter (radix) represents the numerical system (between 2 and 36).
      // Eg. a radix of 16 (hexadecimal) indicates that the number
      // in the string should be parsed from a hexadecimal number to a decimal number.
    } catch (e) {
      console.error(`Got bad value for page:, ${e}`)
      page = 0
    }

    //
    let searchType
    try {
      // get the search type (there are three in this case, text, cast and genre)
      searchType = Object.keys(req.query)[0]
    } catch (e) {
      console.error(`No search keys specified: ${e}`)
    }

    let filters = {}

    switch (searchType) {
      // making sure that the search queries are not empty
      case "genre":
        if (req.query.genre !== "") {
          filters.genre = req.query.genre
        }
        break
      case "cast":
        if (req.query.cast !== "") {
          filters.cast = req.query.cast
        }
        break
      case "text":
        if (req.query.text !== "") {
          filters.text = req.query.text
        }
        break
      default:
      // nothing to do
    }

    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      // pass the filters, page and # of movies per page to the model
      filters,
      page,
      MOVIES_PER_PAGE,
    })

    // convert the response to an object with various properties.
    let response = {
      movies: moviesList,
      page: page,
      filters,
      entries_per_page: MOVIES_PER_PAGE,
      total_results: totalNumMovies,
    }

    res.json(response)
  }
```

## Model

```javascript
  static async getMovies({
    // default values are specified but overwritten if the method is called with values for them.
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}) {
    let queryParams = {}
    if (filters) {
      // the `in` operator returns true if the specified property is in the specified object or its prototype chain
      if ("text" in filters) {
        // pass the value of that filter to the appropriate function
        // ie filter = {text: 'something'}
        // this.textSearchQuery('something')
        queryParams = this.textSearchQuery(filters["text"])
      } else if ("cast" in filters) {
        queryParams = this.castSearchQuery(filters["cast"])
      } else if ("genre" in filters) {
        queryParams = this.genreSearchQuery(filters["genre"])
      }
    }

    // values are defaults to empty objects if not specfied in queryParams
    let { query = {}, project = {}, sort = DEFAULT_SORT } = queryParams
    let cursor
    try {
      cursor = await movies
        .find(query)
        .project(project)
        .sort(sort)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { moviesList: [], totalNumMovies: 0 }
    }

    /**
    Ticket: Paging

    Before this method returns back to the API, use the "moviesPerPage" and
    "page" arguments to decide the movies to display.

    Paging can be implemented by using the skip() and limit() cursor methods.
    */

    // TODO Ticket: Paging
    // Use the cursor to only return the movies that belong on the current page
    const displayCursor = cursor.limit(moviesPerPage)

    try {
      const moviesList = await displayCursor.toArray()
      const totalNumMovies = page === 0 ? await movies.countDocuments(query) : 0

      return { moviesList, totalNumMovies }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { moviesList: [], totalNumMovies: 0 }
    }
  }
```

### Text Search Query

```javascript
  /**
   * Finds and returns movies matching a given text in their title or description.
   * @param {string} text - The text to match with.
   * @returns {QueryParams} The QueryParams for text search
   */
  static textSearchQuery(text) {
    const query = { $text: { $search: text } }
    const meta_score = { $meta: "textScore" }
    const sort = [["score", meta_score]]
    const project = { score: meta_score }

    return { query, project, sort }
  }
```

### Cast Search Query

```javascript
  /**
   * Finds and returns movies including one or more cast members.
   * @param {string[]} cast - The cast members to match with.
   * @returns {QueryParams} The QueryParams for cast search
   */
  static castSearchQuery(cast) {
    const searchCast = Array.isArray(cast) ? cast : cast.split(", ")

    const query = { cast: { $in: searchCast } }
    const project = {}
    const sort = DEFAULT_SORT

    return { query, project, sort }
  }
```

### Genre Search Query

```javascript
  static genreSearchQuery(genre) {
    /**
    Ticket: Text and Subfield Search

    Given an array of one or more genres, construct a query that searches
    MongoDB for movies with that genre.
    */

    const searchGenre = Array.isArray(genre) ? genre : genre.split(", ")
    // TODO Ticket: Text and Subfield Search
    // Construct a query that will search for the chosen genre.
    // The $in operator works only on arrays and return values that have the specified values in that array.
    const query = { genres: { $in: searchGenre } }
    const project = {}
    const sort = DEFAULT_SORT

    return { query, project, sort }
  }
```
