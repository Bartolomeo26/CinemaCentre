const express = require('express');
const router = express.Router();
const actors = require('../controllers/actors')

router.get('/', actors.displayActors)
router.get('/:id', actors.displayActor)

module.exports = router;