import express from "express"
import helmet from "helmet"
import compression from "compression"
import CustomError from "./utils/CustomError.js"
import globalErrorHandler from "./controller/errorController.js"
import hpp from "hpp"

import "./db.js"
const PORT = process.env.PORT || 3000

// Models
import "./models/movie.js"
import "./models/director.js"
import "./models/actor.js"
import "./models/genre.js"
import "./models/user.js"

// ----------------------------------------  Uncaught error handlers
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
app.set('trust proxy', 1);

// ----------------------------------------- Global Middlewares
import ExpressMongoSanitize from "express-mongo-sanitize"
import xssClean from "xss-clean"

// Rate limiting
import { rateLimit } from 'express-rate-limit'
if (process.env.NODE_ENV === "production") {
  const rateLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW,
    limit: process.env.RATE_LIMIT_MAX_NUMBER,
    message: "Too many requests!",
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  })

  app.use("/api", rateLimiter)
}

// max request size
app.use(express.json({ limit: "50kb" }))
// prevents Cross-Site Scripting
app.use(helmet())
// compresses the data
app.use(compression())
// Data sanitization against NoSQL query injection
app.use(ExpressMongoSanitize({
  onSanitize: ({ req, key }) => {
    console.warn(`Request Sanitized: ${JSON.stringify(req.body)}`);
  }
}))
// Data sanitization against XSS
app.use(xssClean())
// Preventing Parameter pollution
app.use(hpp())
// app.use(hpp(whitelist: [""]))


// ---------------------------------------- Routers
import movieRouter from "./routes/movieRouter.js"
import directorRouter from "./routes/directorRouter.js"
import actorRouter from "./routes/actorRouter.js"
import userRouter from "./routes/userRouter.js"

app.use("/api/v1/movies", movieRouter)
app.use("/api/v1/directors", directorRouter)
app.use("/api/v1/actors", actorRouter)
app.use("/api/v1/users", userRouter)

app.all('*', (req, res, next) => {
  const err = new CustomError(`Can't find page - ${req.originalUrl} on the server`, 404)
  next(err)
})

app.use(globalErrorHandler)

const server = app.listen(PORT, () => {
  console.log(`App(${process.env.NODE_ENV}) processID:${process.pid}  port: ${PORT}`)
})
