const express = require("express");
const gameController = require("../controller/game.controller");
const publisherController = require("../controller/publisher.controller");

const router = express.Router();

router.route("/games")
    .get(gameController.games)
    .post(gameController.addGame);

router.route("/games/:gameId")
    .get(gameController.getGame)
    .put(gameController.updateFullGame)
    .patch(gameController.updatePartialGame)
    .delete(gameController.deleteGame);

router.route("/games/:gameId/publishers").get(publisherController.publishers);
router.route("/games/:gameId/publishers/:publisherId").get(publisherController.getPublisher);

router.route("/games/publishers/find").get(publisherController.findPublishers);

module.exports = router;