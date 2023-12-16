import mongoose from "mongoose";

const actor_schema = new mongoose.Schema(
  {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
      }
    ]
  },
  { timestamps: true }
)

const Actor = mongoose.model("Actor", actor_schema)
export default Actor