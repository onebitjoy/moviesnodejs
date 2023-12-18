import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie"
  }]
})

const Genre = mongoose.model("Genre", GenreSchema)
export default Genre