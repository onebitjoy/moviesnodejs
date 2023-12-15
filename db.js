import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGOURL)
  .then(() => { console.log("Connected to MongoDB") })
  .catch(() => console.error("Can't connect to MongoDB"))