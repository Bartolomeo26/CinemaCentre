const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const Series = require('./models/series');
const Movie = require('./models/movie');
const Actor = require('./models/actor');
const User = require('./models/user');
const Review = require('./models/review');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('./middlewares/authMiddleware');
const { calculateDate } = require('./utils/calculateDate');

main()
    .then(() => console.log("Mongo connection working!"))
    .catch(err => console.log(err));


async function main()
{
    await mongoose.connect('mongodb://127.0.0.1:27017/js-project');
}

app.use(express.json());
app.use(cors());



app.listen('3000', () =>
{
    console.log("Everything working on port 3000!")
})

app.get('/', async (req, res) =>
{
    res.json(await Test.find({}));
})
app.get('/movies', async (req, res) =>
{
    res.json(await Movie.find({}));
})
app.get('/movies/:id', async (req, res) =>
{
    const { id } = req.params;
    const movie = await Movie.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate('actors')

    res.json(movie);

})
app.post('/movies/:id/reviews', validateToken, async (req, res) =>
{
    const { id } = req.params;
    const review = req.body;
    const newReview = await Review.create({ ...review, date: calculateDate(), author: req.user.id });
    const movie = await Movie.findById(id);
    const user = await User.findById(req.user.id)
    user.reviews.push(newReview);
    await user.save();
    let rating = movie.rating;
    console.log(movie)
    rating = ((movie.rating * movie.reviews.length) + review.rating) / (movie.reviews.length + 1);
    movie.reviews.push(newReview);
    movie.rating = rating.toFixed(2);
    await movie.save();
})
app.delete('/movies/:id/reviews/:reviewId', validateToken, async (req, res) =>
{
    const { id, reviewId } = req.params;
    const movie = await Movie.findById(id);
    const review = await Review.findById(reviewId);
    if (movie.reviews.length === 1) movie.rating = 0;
    else movie.rating = (((movie.rating * movie.reviews.length) - review.rating) / (movie.reviews.length - 1)).toFixed(2);
    await Review.findByIdAndDelete(reviewId);
    await Movie.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await movie.save();
    await User.findByIdAndUpdate(req.user.id, { $pull: { reviews: reviewId } });

})
app.post('/movies/:id/favourites', validateToken, async (req, res) =>
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
        console.log('dodano do ulubionych!')
    }
    else
    {
        user.favouriteMovies = user.favouriteMovies.filter(favouriteMovie =>
        {
            if (favouriteMovie != parseInt(id))
                return favouriteMovie;
        });
        movie.favouriteNumber--;
        console.log('wyrzucono z ulubionych!')
    }
    await movie.save();
    await user.save();
})
app.post('/movies/:id/watched', validateToken, async (req, res) =>
{
    const { id } = req.params;
    const { selected } = req.body;
    const movie = await Movie.findById(id);
    const user = await User.findById(req.user.id)

    if (selected)
    {
        user.watchedMovies.push(movie);
        console.log('dodano do obejrzanych!')
    }
    else
    {
        user.watchedMovies = user.watchedMovies.filter(watchedMovie =>
        {
            if (watchedMovie !== parseInt(id))
            {
                console.log("siema")
                return watchedMovie;
            }
        });

        console.log('wyrzucono z obejrzanych!')

    }
    await movie.save();
    await user.save();
})
app.get('/series', async (req, res) =>
{
    res.json(await Series.find({}));
})
app.get('/series/:id', async (req, res) =>
{
    const { id } = req.params;
    const series = await Series.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate('actors')

    res.json(series);

})
app.post('/series/:id/reviews', validateToken, async (req, res) =>
{
    const { id } = req.params;
    const review = req.body;
    const newReview = await Review.create({ ...review, date: calculateDate(), author: req.user.id });
    const series = await Series.findById(id);
    const user = await User.findById(req.user.id)
    user.reviews.push(newReview);
    await user.save();
    console.log(series);
    let rating = series.rating;
    console.log(series)
    rating = ((series.rating * series.reviews.length) + review.rating) / (series.reviews.length + 1);
    series.reviews.push(newReview);
    series.rating = rating.toFixed(2);
    await series.save();
})
app.delete('/series/:id/reviews/:reviewId', validateToken, async (req, res) =>
{
    const { id, reviewId } = req.params;

    await Review.findByIdAndDelete(reviewId);
    await Series.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await User.findByIdAndUpdate(req.user.id, { $pull: { reviews: reviewId } });

})
app.post('/series/:id/favourites', validateToken, async (req, res) =>
{
    const { id } = req.params;
    const { selected } = req.body;
    console.log(req.body);
    const series = await Series.findById(id);
    const user = await User.findById(req.user.id)

    if (selected)
    {
        user.favouriteSeries.push(series);
        series.favouriteNumber++;
        console.log('dodano do ulubionych!')
    }
    else
    {
        user.favouriteSeries = user.favouriteSeries.filter(favouriteSerie =>
        {
            if (favouriteSerie != parseInt(id))
                return favouriteSerie;
        });
        serie.favouriteNumber--;
        console.log('wyrzucono z ulubionych!')
    }
    await series.save();
    await user.save();
})
app.post('/series/:id/watched', validateToken, async (req, res) =>
{
    const { id } = req.params;
    const { selected } = req.body;
    const series = await Series.findById(id);
    const user = await User.findById(req.user.id)

    if (selected)
    {
        user.watchedSeries.push(series);
        console.log('dodano do obejrzanych!')
    }
    else
    {
        user.watchedSeries = user.watchedSeries.filter(watchedSerie =>
        {
            if (watchedSerie !== parseInt(id))
            {
                console.log("siema")
                return watchedSerie;
            }
        });

        console.log('wyrzucono z obejrzanych!')

    }
    await series.save();
    await user.save();
})
app.get('/actors', async (req, res) =>
{
    res.json(await Actor.find({}));
})
app.get('/actors/:id', async (req, res) =>
{
    const { id } = req.params;
    const actor = await Actor.findById(id).populate('movies').populate('series');
    res.json(actor);

})
app.get('/users/:id', async (req, res) =>
{
    const { id } = req.params;

    const user = await User.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate('favouriteMovies').populate('watchedMovies').populate('favouriteSeries').populate('watchedSeries');
    res.json(user);
})
app.post('/users/login', async (req, res) =>
{

    const user = req.body;

    const databaseUser = await User.findOne({ username: user.username });
    if (!databaseUser)
    {
        res.json({ error: "Such a user does not exist!" });
    }
    else
    {
        const isUser = await bcrypt.compare(user.password, databaseUser.password);
        if (isUser)
        {

            const accessToken = sign({ username: user.username, id: databaseUser._id }, "verysecret");
            res.json(accessToken)
        }
        else
        {
            res.json({ error: 'Wrong username or password!' });
        }
    }

})
app.post('/users/register', async (req, res) =>
{
    const user = req.body;

    const isUser = await User.findOne({ $or: [{ username: user.username }, { email: user.email }] })
    if (isUser)
    {
        res.json({error:"A user with this username or email already exists!"});
        
    }
    else
    {
        const hash = await bcrypt.hash(user.password, 10);

        await User.create({ ...user, password: hash });
        res.json("Successfully logged in!")
    }
})



