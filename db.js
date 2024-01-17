import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log(`Connected to MongoDB at ${Date().toLocaleUpperCase()}`)
  })
//error is gracefully handled inside index.js

// .catch(
//   (error) => {
//     console.error(error)
//     process.exit(1)
//   }
// )