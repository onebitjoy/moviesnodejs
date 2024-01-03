import { genreSaver, genreData } from "./genreCreator.js"
import { randomGenres, randomMovieSaver } from "./movieCreator.js"
import "../db.js"
async function creator() {

  try {
    // console.log("Saving genres inside database...");
    // await genreSaver(genreData)
    console.log("Saving sample movie inside database...");
    await randomMovieSaver(200)
    // randomGenres()

  } catch (error) {
    console.log("errors");
    console.log(error);

    // } finally {
    // process.exit()
  } finally {
    process.exit(1)
  }

}

// just uncomment the line below to update the database with sample data
creator()