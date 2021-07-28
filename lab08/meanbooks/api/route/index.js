const express = require("express");
const bookController = require("../controller/book.controller");
const publisherController = require("../controller/publisher.controller");
const reviewController = require("../controller/review.controller");

const router = express.Router();

router.route("/books")
    .get(bookController.books)
    .post(bookController.createBook);

router.route("/books/:bookId")
    .get(bookController.getBook)
    .put(bookController.updateFullBook)
    .patch(bookController.updatePartialBook)
    .delete(bookController.deleteBook);

router.route("/books/:bookId/publishers")
    .get(publisherController.publisher)
    .put(publisherController.addPublisher)
    .delete(publisherController.deletePublisher);

router.route("/books/:bookId/reviews")
    .get(reviewController.reviews)
    .put(reviewController.addReview)
    .delete(publisherController.deletePublisher);

router.route("/books/:bookId/reviews/:reviewId")
    .put(reviewController.updateReview)
    .delete(reviewController.deleteReview);

module.exports = router;