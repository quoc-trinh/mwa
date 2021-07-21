const express = require("express");

const gameController = require("../controller/game.controller");
const router = express.Router();

router.route("/games").get(gameController.games);

module.exports = router;