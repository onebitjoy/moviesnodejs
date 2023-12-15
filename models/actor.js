import mongoose from "mongoose";

const actor_schema = new mongoose.Schema(
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
          ref: "Movie"
        }
      }
    ]
  },
  { timestamps: true }
)

const Actor = mongoose.model("Actor", actor_schema)
export default Actor