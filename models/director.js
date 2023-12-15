import mongoose from "mongoose";

const director_schema = new mongoose.Schema(
  {
    // directorId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   default: new mongoose.Types.ObjectId(),
    //   alias: "_id"
    // },
    fullName: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true
    },
    birthDate: {
      type: Date,
      required: true
    },
    movies: [
      {
        movieId: {
          type: mongoose.Schema.Types.ObjectId,
        }
      }
    ]
  },
  { timestamps: true }
)

const Director = mongoose.model("Director", director_schema)
export default Director