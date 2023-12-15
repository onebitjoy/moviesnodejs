import mongoose from "mongoose";

const genre_schema = new mongoose.Schema({
  genreName: {
    type: String
  },
  movies: [{
    moviesId: {
      type: mongoose.Schema.Types.ObjectId
    }
  }]
})

const Genre = mongoose.model("Genre", genre_schema)
export default Genre