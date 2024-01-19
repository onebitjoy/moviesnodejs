import mongoose from "mongoose";
const date = new Date()
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log(`Connected to MongoDB at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
  })
//error is gracefully handled inside index.js

// .catch(
//   (error) => {
//     console.error(error)
//     process.exit(1)
//   }
// )