import express from "express"
import helmet from "helmet"
import compression from "compression"
import { errorMsg } from "./messages/errorMsg.js"
import CustomError from "./utils/CustomError.js"
import globalErrorHandler from "./controller/errorController.js"

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

app.use("/api/v1/movies", movieRouter)
app.use("/api/v1/directors", directorRouter)
app.use("/api/v1/actors", actorRouter)

app.all('*', (req, res, next) => {
  const err = new CustomError(`Can't find page - ${req.originalUrl} on the server`, 404)
  next(err)
})

// don't add () at the end, produces undefined error
app.use(globalErrorHandler)

const server = app.listen(PORT, () => {
  console.log(`App(${process.env.NODE_ENV}) on port -`, PORT)
})


process.on('unhandledRejection', (err) => {
  console.log("Unhandled Rejection --", err.name, ":", err.message)
  server.close(
    () => {
      console.log("Exiting...");
      process.exit(1)
    }
  )
})