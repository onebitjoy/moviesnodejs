import express from "express"
import helmet from "helmet"
import compression from "compression"

// import dotenv from 'dotenv'
// dotenv.config({ path: "./config.env" })

import "./db.js"
const PORT = process.env.PORT || 3000

// Models
import "./models/movie.js"
import "./models/director.js"
import "./models/actor.js"
import "./models/genre.js"

const app = express()

app.use(express.json()) // if there is validation error, check this
app.use(helmet()) // prevents Cross-Site Scripting
app.use(compression())

// Routers
import movieRouter from "./routes/movieRouter.js"
import directorRouter from "./routes/directorRouter.js"
import actorRouter from "./routes/actorRouter.js"

app.use("/api/movies", movieRouter)
app.use("/api/directors", directorRouter)
app.use("/api/actors", actorRouter)

app.listen(PORT, () => {
  console.log("App listening on port -", PORT)
})