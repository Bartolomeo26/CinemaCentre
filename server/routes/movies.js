const express = require('express');
const router = express.Router();
const { validateToken } = require('../utils/authMiddleware');
const movies = require('../controllers/movies')

router.get('/', movies.displayMovies)
router.get('/:id', movies.displayMovie)
router.post('/:id/favourites', validateToken, movies.addMovieToFavourite)
router.post('/:id/watched', validateToken, movies.addMovieToWatched)


module.exports = router;