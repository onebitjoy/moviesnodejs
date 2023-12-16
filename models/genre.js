import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
  genreName: {
    type: String
  },
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie"
  }]
})

const Genre = mongoose.model("Genre", GenreSchema)
export default Genre