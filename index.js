import express from "express"
import "./db.js"
const PORT = process.env.PORT

// Models
import "./models/movie.js"
import "./models/director.js"
import "./models/actor.js"
import "./models/genre.js"

import movieRouter from "./routes/movieRouter.js"

const app = express()
app.use(express.json()) // if there is validation error, check this

// Routers
app.use("/api/movies", movieRouter)

app.listen(PORT, () => {
  console.log("App listening on port ", PORT)
})