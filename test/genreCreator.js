import Genre from "../models/genre.js";

export const genreData = [
  {
    name: "Literary genres",
    description: "Genres related to literature and written works.",
    movies: []
  },
  {
    name: "Action",
    description: "A genre characterized by physical activity and intense excitement.",
    movies: []
  },
  {
    name: "Adventure",
    description: "A genre involving thrilling and dangerous experiences.",
    movies: []
  },
  {
    name: "Comedy",
    description: "A genre focused on humor, satire, and lighthearted entertainment.",
    movies: []
  },
  {
    name: "Crime and mystery",
    description: "A genre centered around criminal activities and solving mysteries.",
    movies: []
  },
  {
    name: "Death game",
    description: "A genre involving scenarios where characters must participate in deadly games.",
    movies: []
  },
  {
    name: "Fantasy",
    description: "A genre featuring magical elements, mythical creatures, and fantastical worlds.",
    movies: []
  },
  {
    name: "Historical",
    description: "A genre set in the past, often featuring historical events and figures.",
    movies: []
  },
  {
    name: "Historical fiction",
    description: "A genre that blends historical facts with fictional elements.",
    movies: []
  },
  {
    name: "Horror",
    description: "A genre designed to evoke fear, dread, and terror in the audience.",
    movies: []
  },
  {
    name: "Romance",
    description: "A genre focused on romantic relationships and love stories.",
    movies: []
  },
  {
    name: "Satire",
    description: "A genre that uses humor, irony, and ridicule to criticize or mock people or society.",
    movies: []
  },
  {
    name: "Science fiction",
    description: "A genre that explores speculative concepts, often involving futuristic technology and space exploration.",
    movies: []
  },
  {
    name: "Cyberpunk and derivatives",
    description: "A subgenre of science fiction that focuses on high-tech, dystopian settings.",
    movies: []
  },
  {
    name: "Speculative",
    description: "A genre that explores alternative realities and speculative concepts.",
    movies: []
  },
  {
    name: "Thriller",
    description: "A genre characterized by suspense, tension, and excitement.",
    movies: []
  },
  {
    name: "Isekai",
    description: "A subgenre of anime and manga where characters are transported to another world.",
    movies: []
  },
  {
    name: "Other",
    description: "Genres that do not fit into the specified categories.",
    movies: []
  },
  {
    name: "Film and television genres",
    description: "Genres related to the film and television industry.",
    movies: []
  },
  {
    name: "Scripted",
    description: "A genre involving planned and rehearsed content, such as scripted TV shows and movies.",
    movies: []
  },
  {
    name: "Action and adventure",
    description: "A genre characterized by physical activity and thrilling experiences.",
    movies: []
  },
  {
    name: "Animation",
    description: "A genre that uses animated visuals to tell a story.",
    movies: []
  },
  {
    name: "Comedy",
    description: "A genre focused on humor, satire, and lighthearted entertainment.",
    movies: []
  },
  {
    name: "Devotional",
    description: "A genre related to religious or spiritual themes.",
    movies: []
  },
  {
    name: "Drama",
    description: "A genre focused on realistic characters and emotional themes.",
    movies: []
  },
  {
    name: "Hindu mythology",
    description: "A genre involving stories and themes from Hindu mythology.",
    movies: []
  },
  {
    name: "Historical",
    description: "A genre set in the past, often featuring historical events and figures.",
    movies: []
  },
  {
    name: "Horror",
    description: "A genre designed to evoke fear, dread, and terror in the audience.",
    movies: []
  },
  {
    name: "Science fiction",
    description: "A genre that explores speculative concepts, often involving futuristic technology and space exploration.",
    movies: []
  },
  {
    name: "Western",
    description: "A genre set in the American Old West, often featuring cowboys and outlaws.",
    movies: []
  },
  {
    name: "Unscripted",
    description: "A genre involving spontaneous or unscripted content, such as reality TV.",
    movies: []
  }

];

let genres = []
genreData.forEach((genre) => genres.push(genre.name))
console.log(genres)

export async function genreSaver(data) {
  data.forEach(async (genre) => {
    try {
      Genre.create(genre).then((newGenre) => console.log(`Genre Created: ${newGenre.name}`))
    } catch (error) {
      console.log(error)
    }
  });
}

export default genreData;