const { calculateDate } = require('../utils/calculateDate');
const Review = require('../models/review');
const Movie = require('../models/movie');
const Series = require('../models/series');
const User = require('../models/user');

module.exports.displayReview = async (req, res) =>
{
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    res.json(review);

}

module.exports.addReviewToMovies = async (req, res) =>
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
    res.send(newReview);
}

module.exports.editReviewInMovies = async (req, res) =>
{
    const { id, reviewId } = req.params;
    const updatedReview = req.body;

    const movie = await Movie.findById(id);

    const oldReview = await Review.findByIdAndUpdate(reviewId, updatedReview);
    const newReview = await Review.findById(reviewId);
    movie.rating = (movie.rating * movie.reviews.length - oldReview.rating + newReview.rating) / movie.reviews.length;
    await movie.save();

    res.json("Successfully edited!")
}

module.exports.deleteReviewInMovies = async (req, res) =>
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

}

module.exports.addReviewToSeries = async (req, res) =>
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
}

module.exports.editReviewInSeries = async (req, res) =>
{
    const { id, reviewId } = req.params;
    const updatedReview = req.body;

    const series = await Series.findById(id);

    const oldReview = await Review.findByIdAndUpdate(reviewId, updatedReview);
    const newReview = await Review.findById(reviewId);
    series.rating = (series.rating * series.reviews.length - oldReview.rating + newReview.rating) / series.reviews.length;
    await series.save();

    res.json("Successfully edited!")
}

module.exports.deleteReviewInSeries = async (req, res) =>
{
    const { id, reviewId } = req.params;
    const series = await Series.findById(id);
    const review = await Review.findById(reviewId);
    if (series.reviews.length === 1) series.rating = 0;
    else series.rating = (((series.rating * series.reviews.length) - review.rating) / (series.reviews.length - 1)).toFixed(2);
    await Review.findByIdAndDelete(reviewId);
    await Series.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await series.save();
    await User.findByIdAndUpdate(req.user.id, { $pull: { reviews: reviewId } });

}
