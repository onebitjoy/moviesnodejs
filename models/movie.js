import mongoose from "mongoose";
import fs from 'fs'
import { nanoid } from "nanoid";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required field"],
      trim: true
    },
    genre: [
      {
        type: String,
      }
    ],
    releaseDate: {
      type: Date
    },
    duration: {
      type: Number,
      required: [true, "Duration is required field"]
    },
    rating: {
      type: Number,
      // min: 0,  
      // max: 10
      validate: {
        validator: function (value) {
          return value >= 0 && value <= 10
        },
        message: "Given rating of {VALUE} is not valid"
      }
    },
    totalRatingCount: {
      type: Number,
      // This below field is used to handle whether a user will get a particular field upon query or not
      // select: false -- will not send the field, 'true' will send
    },
    coverImage: {
      type: String,
      required: [true, "coverImage is required"]
    },
    language: [
      {
        type: String,
      }
    ],
    plot: {
      type: String,
      max: 500,
      trim: true
    },
    releaseYear: {
      type: Number,
      min: 1900,
      // max: new Date().getFullYear(),
      required: true
    },
    createdBy: {
      type: String
    },
    price: {
      type: Number,
      validate: {
        validator: function (value) {
          return value >= 0
        },
        message: "You can't have negative price"
      }
    },
    directors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Director"
      }
    ],
    actors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actor"
      }
    ]
  },
  /*
  If you include toJSON: { virtuals: true } but not toObject: { virtuals: true },
  it means that virtual properties will be included when converting the document to JSON,
  but not when converting it to a plain JavaScript object.
  */
  // OPTIONS ->
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false
  }
)

/* VIRTUAL */
MovieSchema.virtual("durationInHours").get(function () {
  // anon function because arrow function doesn't support 'this'
  return (this.duration / 60).toFixed(2)
})

/*
  We can have multiple pre and post hooks,
  the order of application is same as their definition
*/
/* PRE HOOKS */
MovieSchema.pre('save', function (next) {
  // console.table(this)
  this.createdBy = "Abhishek Kharwar"
  next()
})

MovieSchema.pre(/^find/, function (next) {
  //This function is running before any find... method is executed on mongoDB
  // this -- is the query object, that means here we are just appending queries to it
  // send only the movies that are already launched, not will be launched in the future
  // this.find({ releaseDate: { $lte: Date.now() } }) 
  // this.queryDetails = {
  this.queryId = nanoid(),
    this.startTime = Date.now()
  // }
  next()
})

MovieSchema.pre('aggregate', function (next) {
  // console.log(this.pipeline()) -- returns entire aggregation array
  // this.pipeline().unshift({ $match: { releaseDate: { $lte: new Date() } } })
  this.pipeline().unshift({ $sort: { _id: 1 } })
  next()
})

/* POST HOOKS */
MovieSchema.post(/^find/, async function (docs, next) {
  this.endTime = Date.now()
  const content = `Query ${this.queryId} ${this.startTime}ms ${this.endTime}ms\n`
  fs.writeFileSync(
    './Logs/logs.txt',
    content, { flag: 'a' },
    err => { console.log("Logging Error - Post hook", err) }
  )
  next()
})

MovieSchema.post('save', async function (doc, next) {
  const content = `Movie(${doc.title}) is created by ${doc?.createdBy}\n`

  fs.appendFile("./Logs/logs.txt", content, (err) => {

    if (err === null) { return }

    if (err?.code === "EACCES") {
      console.log("Denied permission to write, check movie.js");
      return
    }

    if (err?.code === "ENOTDIR" || err?.code === "ENOENT") {
      console.log("Movie.js:", "No file to write");
      return
    }

    if (err !== null) {
      console.log("Something wrong happened");
      return
    }
  })
  next()
})

MovieSchema.methods.toJSON = function () {
  const movie = this
  const movieObj = movie.toObject()

  delete movieObj.__v
  delete movieObj.updatedAt
  delete movieObj.createdAt

  return movieObj
}

const Movie = mongoose.model("Movie", MovieSchema)
export default Movie