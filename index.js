import express from "express"

import "./db.js"

const PORT = process.env.PORT

// Models
import "./models/movie.js"
import "./models/director.js"
import "./models/actor.js"
import "./models/genre.js"

const app = express()
app.use(express.json()) // if there is validation error, check this

// Routers
import movieRouter from "./routes/movieRouter.js"
import directorRouter from "./routes/directorRouter.js"
import actorRouter from "./routes/actorRouter.js"

app.use("/api/movies", movieRouter)
app.use("/api/directors", directorRouter)
app.use("/api/actors", actorRouter)

app.listen(PORT, () => {
  console.log("App listening on port ", PORT)
})