const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.get('/:id', users.displayUser)
router.post('/login', users.loginUser)
router.post('/register', users.registerUser)
module.exports = router;