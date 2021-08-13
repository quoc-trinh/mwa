const express = require("express");
const bookController = require("../controller/book.controller");
const publisherController = require("../controller/publisher.controller");
const reviewController = require("../controller/review.controller");
const userController = require("../controller/user.controller");

const router = express.Router();

router.route("/books")
    .get(bookController.books)
    .post(userController.authenticate, bookController.createBook);

router.route("/books/:bookId")
    .get(bookController.getBook)
    .put(userController.authenticate, bookController.updateFullBook)
    .patch(userController.authenticate, bookController.updatePartialBook)
    .delete(userController.authenticate, bookController.deleteBook);

router.route("/books/:bookId/publishers")
    .get(publisherController.publisher)
    .put(userController.authenticate, publisherController.addPublisher)
    .delete(userController.authenticate, publisherController.deletePublisher);

router.route("/books/:bookId/reviews")
    .get(reviewController.reviews)
    .put(reviewController.addReview);

router.route("/books/:bookId/reviews/:reviewId")
    .put(reviewController.updateReview)
    .delete(userController.authenticate, reviewController.deleteReview);

router.route("/users/register")
    .post(userController.register);
router.route("/users/login").post(userController.login);

module.exports = router;