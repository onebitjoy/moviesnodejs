import Movie from "../models/movie.js";

export class ApiFeatures {
  constructor(query, queryStr) {
    // in each step, since we are modifying the query string, we need to use filter, sort and limiting fields, on the query itself
    // in short we are going to chain all the different methods.
    this.query = query // Movie.find | Director.find etc.
    this.queryStr = queryStr // req.query
  }

  filter() {

    const filterQueryObject = { ...this.queryStr };

    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach((el) => delete filterQueryObject[el]);

    const queryStr = JSON
      .stringify(filterQueryObject)
      .replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt'); // Default sorting by createdAt
    }

    return this;
  }

  paginate() {
    const page = this.queryStr.page || 1
    const limit = (this.queryStr.limit > 50 && req.query.limit < 0) ? this.queryStr.limit : 20

    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)

    return this
  }

}

/*
  NOT DUCKING WORKING, obviously because filtering here doesn't handle more than one filtering property
  // filter() {
    //   console.log("filter working...");
    //   let queryCopy = this.queryStr
    
    
    //   this.query = this.query.find(queryCopy)
    
    //   // this - the whole object and not just the object itself, upon which we will chain sort method
    //   return this
    // }
    */
