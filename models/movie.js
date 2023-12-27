import mongoose from "mongoose";
import fs from 'fs'

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
    duration: {
      type: Number,
      required: [true, "Duration is required field"]
    },
    rating: {
      type: Number,
      min: 0,
      max: 10
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
      max: new Date().getFullYear(),
      required: true
    },
    createdBy: {
      type: String
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

/* POST HOOKS */
MovieSchema.post('save', function (doc, next) {
  const content = `Movie(${doc.title}) is created\n`
  fs.writeFileSync("./Logs/logs.txt", content, { flag: 'a' }, (err) => {
    console.log(err)
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