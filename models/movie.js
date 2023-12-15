import mongoose from "mongoose";

const movie_schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "TItle is required field"]
    },
    genre: {
      type: String
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
    directors: [
      {
        directorId: {
          type: mongoose.Schema.Types.ObjectId
        }
      }
    ],
    actors: [
      {
        actorId: {
          type: mongoose.Schema.Types.ObjectId
        }
      }
    ]
  },
  { timestamps: true }
)

const Movie = mongoose.model("Movie", movie_schema)

// const movie = new Movie({
//   title: 'Inception',
//   genre: "Crime, Thriller",
//   duration: 150,
//   rating: 8.0,
//   plot: "A team of conman are on a mission to steal important information inside the mind of a industrialists",
//   directors: [new mongoose.Types.ObjectId()],
//   actors: [new mongoose.Types.ObjectId()]
// })

// await movie.save()
export default Movie