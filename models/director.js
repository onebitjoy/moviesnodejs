import mongoose from "mongoose";

const DirectorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true
    },
    nationality: {
      type: String,
    },
    birthDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value instanceof Date && !isNaN(value)
        },
        message: "Invalid Birth Date"
      }
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

const Director = mongoose.model("Director", DirectorSchema)
export default Director