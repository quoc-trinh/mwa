const express = require("express");
const gameController = require("../controller/game.controller");
const publisherController = require("../controller/publisher.controller");
const reviewController = require("../controller/review.controller");
const userController = require("../controller/user.controller");

const router = express.Router();

router.route("/games")
    .get(gameController.games)
    .post(userController.authenticate, gameController.addGame);

router.route("/games/:gameId")
    .get(gameController.getGame)
    .put(userController.authenticate, gameController.updateFullGame)
    .patch(userController.authenticate, gameController.updatePartialGame)
    .delete(userController.authenticate, gameController.deleteGame);

router.route("/games/:gameId/publishers")
    .get(publisherController.publishers)
    .put(publisherController.updatePublisher);

router.route("/games/publishers/find").get(publisherController.findPublishers);

router.route("/games/:gameId/reviews")
    .get(reviewController.reviews)
    .put(reviewController.addReviews);

router.route("/users/register")
    .post(userController.register);
router.route("/users/login").post(userController.login);

module.exports = router;