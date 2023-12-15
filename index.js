import express from "express"
import "./db.js"

// Models
import "./models/movie.js"
import "./models/director.js"
import "./models/actor.js"
import "./models/genre.js"

const app = express()

app.listen(process.env.PORT, () => {
  console.log("App listening on port ", process.env.PORT)
})