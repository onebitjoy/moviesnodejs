import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required field"]
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre"
    },
    duration: {
      type: Number,
      required: [true, "Duration is required field"]
    },
    rating: {
      type: Number,
      default: 1.0,
      min: 0.0,
      max: 10.0
    },
    plot: {
      type: String,
      max: 500
    },
    releaseYear: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear(),
      required: true
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
  { timestamps: true }
)

const Movie = mongoose.model("Movie", MovieSchema)
export default Movie