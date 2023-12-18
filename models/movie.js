import mongoose from "mongoose";

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
      type: Number
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