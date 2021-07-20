const express = require("express");
const gameController = require("../controller/game.controller");
const numberController = require("../controller/numbers.controller");
const router = express.Router();

router.route("/games").get(gameController.games);
router.route("/numbers/sum/:firstNumber").get(numberController.sum);

module.exports = router;