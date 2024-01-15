import express from "express"
import helmet from "helmet"
import compression from "compression"
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
import "./models/user.js"

// Uncaught error handlers
// ----------------------------------------
process.on('unhandledRejection', (err) => {
  console.log("Unhandled Rejection --", err.name, ":", err.message)
  console.log(err);
  server.close(
    () => {
      console.log("Exiting...");
      process.exit(1)
    }
  )
})

process.on('uncaughtException', (err) => {
  console.log("Uncaught Exception --", err.name, ":", err.message, "\nExiting...")
  process.exit(1)
})
// ----------------------------------------

const app = express()

app.use(express.json()) // if there is validation error, check this
app.use(helmet()) // prevents Cross-Site Scripting
app.use(compression())

// Routers
import movieRouter from "./routes/movieRouter.js"
import directorRouter from "./routes/directorRouter.js"
import actorRouter from "./routes/actorRouter.js"
import authRouter from "./routes/authRouter.js"
import { auth } from "./middlewares/auth.js"

app.use("/api/v1/movies", auth, movieRouter)
app.use("/api/v1/directors", directorRouter)
app.use("/api/v1/actors", actorRouter)
app.use("/api/v1/users", authRouter)

app.all('*', (req, res, next) => {
  const err = new CustomError(`Can't find page - ${req.originalUrl} on the server`, 404)
  next(err)
})

app.use(globalErrorHandler)

const server = app.listen(PORT, () => {
  console.log(`App(${process.env.NODE_ENV}) on port -`, PORT)
})