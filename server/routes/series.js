const express = require('express');
const router = express.Router();
const { validateToken } = require('../utils/authMiddleware');
const series = require('../controllers/series')


router.get('/', series.displaySeries)

router.get('/:id', series.displaySerie)

router.post('/:id/favourites', validateToken, series.addSerieToFavourite)
router.post('/:id/watched', validateToken, series.addSerieToWatched)


module.exports = router;