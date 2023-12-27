import mongoose from "mongoose";

// import dotenv from 'dotenv'
// dotenv.config({ path: "./config.env" })

mongoose
  .connect(process.env.MONGOURL)
  .then(() => { console.log("Connected to MongoDB") })
  .catch(() => console.error("Can't connect to MongoDB"))