const express = require('express');
const router = express.Router();
const { validateToken } = require('../utils/authMiddleware');
const reviews = require('../controllers/reviews');


router.get('/reviews/:reviewId', reviews.displayReview)

router.post('/movies/:id/reviews', validateToken, reviews.addReviewToMovies)

router.route('/movies/:id/reviews/:reviewId')
    .delete(validateToken, reviews.deleteReviewInMovies)
    .put(reviews.editReviewInMovies)


router.post('/series/:id/reviews', validateToken, reviews.addReviewToSeries)
router.route('/series/:id/reviews/:reviewId')
    .delete(validateToken, reviews.deleteReviewInSeries)
    .put(reviews.editReviewInSeries)

module.exports = router;