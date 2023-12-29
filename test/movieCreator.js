import Movie from "../models/movie.js";
import { faker } from '@faker-js/faker';
import genreData from "./genreCreator.js";

const popularLanguages = [
  'English',
  'Spanish',
  'Mandarin Chinese',
  'Hindi',
  'Arabic',
  'French',
  'Russian',
  'Portuguese',
  'Bengali',
  'Urdu',
  'Indonesian',
  'German',
  'Japanese',
  'Swahili',
  'Korean',
  'Turkish',
  'Italian',
  'Tamil',
  'Vietnamese',
  'Telugu',
  'Marathi',
  'Thai',
  'Punjabi',
  'Gujarati',
  'Polish',
  'Ukrainian',
  'Malayalam',
  'Kannada',
  'Odia',
  'Nepali',
  'Sinhala',
  'Farsi (Persian)',
  'Dutch',
  'Greek',
  'Czech',
  'Hungarian',
  'Swedish',
  'Finnish',
  'Danish',
  'Norwegian',
  'Hebrew',
  'Romanian',
  'Malay',
  'Burmese',
  'Tagalog (Filipino)',
  'Amharic',
  'Lao',
  'Bulgarian',
  'Croatian',
  'Serbian',
  'Latvian',
  'Lithuanian',
  'Slovak',
  'Slovenian',
  'Estonian',
  'Albanian',
  'Georgian',
  'Armenian',
  'Azerbaijani',
  'Kazakh',
  'Uzbek',
  'Turkmen',
  'Kyrgyz',
  'Tajik',
  'Pashto',
  'Kurdish',
  'Tibetan',
  'Mongolian',
  'Uighur',
  'Kurdish (Kurmanji)',
  'Kurdish (Sorani)',
  'Dari',
  'Balochi',
  'Sindhi',
  'Pushto',
  'Fijian',
  'Tongan',
  'Samoan',
  'Maori',
  'Hawaiian',
  'Yoruba',
  'Igbo',
  'Hausa',
  'Zulu',
  'Xhosa',
  'Swazi',
  'Sotho',
  'Tswana',
  'Ndebele',
  'Shona',
  'Tigrinya',
  'Oromo',
  'Somali',
  'Guarani',
  'Quechua',
  'Aymara',
  'Mapudungun',
  'Rapa Nui',
  'Cherokee',
  'Navajo',
  'Inuktitut',
  'Kalaallisut',
  'Sami',
  'Frisian',
  'Welsh',
  'Scots Gaelic',
  'Irish',
  'Basque',
  'Galician',
  'Catalan',
  'Occitan',
  'Breton',
  'Corsican',
  'Luxembourgish',
  'Esperanto',
];

// Function to generate a random movie object
const generateRandomMovie = () => ({
  title: faker.word.adjective() + " " + faker.word.noun(),
  genre: randomGenres(genreData),
  releaseDate: randomDates(),
  price: randomNumberGenerator(2, 100),
  duration: randomNumberGenerator(2, 240),
  rating: randomNumberGenerator(0, 10),
  language: randomLanguages(popularLanguages),
  totalRatingCount: randomNumberGenerator(1, 10000),
  coverImage: faker.image.urlLoremFlickr({ category: 'movie' }),
  plot: faker.lorem.paragraph({ min: 1, max: 3 }),
  releaseYear: randomNumberGenerator(1900, new Date().getFullYear()),
  directors: [],
  actors: [],
});

console.log(generateRandomMovie())
function randomDates() {
  const start = new Date('1900-01-01')
  const end = new Date()

  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime())

  return (new Date(randomTime)).toISOString()
}

function randomNumberGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomLanguages(languages) {
  const seed = Math.floor(Math.random() * 5)
  const languagesArray = Array.from({ length: seed }, () => {
    const index = Math.floor(Math.random() * languages.length)
    return languages[index]
  })
  return [...new Set(languagesArray)]
}

export function randomGenres(genreData) {
  const seed = Math.ceil(Math.random() * 5)
  const genresArray = Array.from({ length: seed }, () => {
    const index = Math.floor(Math.random() * genreData.length)
    return genreData[index].name
  })
  return [...new Set(genresArray)]
}

// Generating five random movie objects
export async function randomMovieSaver(numberOfMovies) {
  const randomMovies = Array.from({ length: numberOfMovies }, generateRandomMovie);
  for (let i = 0; i < randomMovies.length; i++) {
    try {
      const movie = await Movie.create(randomMovies[i])
      console.log("Movie saved: ", movie.title);
    } catch (error) {
      console.log(error);
    }
  }
}

// to create movies uncomment this
// ======================
// randomMovieSaver()
// ======================


/* To check if random values are within range*/
// --------------------------------------------
// for (let i = 0; i < 1000; i++) {
//   // console.log("run ", i);
//   if (randomNumberGenerator(0, 10) === 10) {
//     console.log("10")
//   }
//   if (randomNumberGenerator(0, 10) === 0) {
//     console.log("0")
//   }
//   if (randomNumberGenerator(0, 10) < 0) {
//     console.log("less than 0")
//   }

//   if (randomNumberGenerator(0, 10) > 10) {
//     console.log("more than 10")
//   }
// }
// 7861