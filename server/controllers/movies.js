const Movie = require('../models/movie');
const User = require('../models/user');

module.exports.displayMovies = async (req, res) =>
{
    res.json(await Movie.find({}));
}

module.exports.displayMovie = async (req, res) =>
{
    const { id } = req.params;
    const movie = await Movie.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate('actors')
    res.json(movie);
}

module.exports.addMovieToFavourite = async (req, res) =>
{
    const { id } = req.params;
    const { selected } = req.body;
    console.log(req.body);
    const movie = await Movie.findById(id);
    const user = await User.findById(req.user.id)

    if (selected)
    {
        user.favouriteMovies.push(movie);
        movie.favouriteNumber++;
        console.log('Added to favourites!')
    }
    else
    {
        user.favouriteMovies = user.favouriteMovies.filter(favouriteMovie =>
        {
            if (favouriteMovie != parseInt(id))
                return favouriteMovie;
        });
        movie.favouriteNumber--;
        console.log('Removed from favourites!')
    }
    await movie.save();
    await user.save();
}

module.exports.addMovieToWatched = async (req, res) =>
{
    const { id } = req.params;
    const { selected } = req.body;
    const movie = await Movie.findById(id);
    const user = await User.findById(req.user.id)

    if (selected)
    {
        user.watchedMovies.push(movie);
        console.log('Added to watched!')
    }
    else
    {
        user.watchedMovies = user.watchedMovies.filter(watchedMovie =>
        {
            if (watchedMovie !== parseInt(id))
            {
                
                return watchedMovie;
            }
        });

        console.log('Removed from watched!')

    }
    await movie.save();
    await user.save();
}