const mongoose = require('mongoose');
const Movie = require('../models/movie')
const {movies} = require('../data/movies');
main()
    .then(() => console.log("Mongo connection working!"))
    .catch(err => console.log(err));


async function main()
{
    await mongoose.connect('mongodb://127.0.0.1:27017/js-project');
}

async function addMovies()
{
    await Movie.deleteMany({});
    for (let i = 1; i <= 3; i++)
    {
        const movie = await Movie.create({...movies[i-1], _id: i });
        await movie.save();
    }

}
addMovies();