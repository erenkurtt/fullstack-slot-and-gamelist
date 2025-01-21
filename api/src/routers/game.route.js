// game.route.js
const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/game.controller');

router.get('/', gamesController.getGames);

module.exports = router;