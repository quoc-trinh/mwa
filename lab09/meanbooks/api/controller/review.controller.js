const mongoose = require("mongoose");
const { findBookAndUpdate } = require("./book.controller");

module.exports.reviews = (req, res) => {
    findBookAndUpdate(req, res, (req, res, book) => {
        res.status(200).json(book.reviews);
    });
}

module.exports.addReview = (req, res) => {
    findBookAndUpdate(req, res, (req, res, book) => {
        const review = {
            name: req.body.name,
            comment: req.body.comment
        }
        book.reviews.push(review);
        book.save((err, updateGame) => {
            const response = { status: 204 };
            if (err) {
                console.log("Error finding game");
                response.status = 500;
                response.message = err;
            }
            res.status(response.status).json(response.message);
        });
    });
}

module.exports.updateReview = (req, res) => {
    findBookAndUpdate(req, res, (req, res, book) => {
        const reviewId = req.params.reviewId;
        const review = book.reviews.id(reviewId);

        if (!review) {
            res.status(404).json(`{message: review ${reviewId} not found}`);
            return;
        }

        review.name = req.body.name;
        review.comment = req.body.comment;

        book.save((err, updateGame) => {
            const response = { status: 204, message: updateGame };
            if (err) {
                console.log("Error finding game");
                response.status = 500;
                response.message = err;
            }
            res.status(response.status).json(response.message);
        });
    });
}

module.exports.deleteReview = (req, res) => {
    findBookAndUpdate(req, res, (req, res, book) => {
        const reviewId = req.params.reviewId;
        book.reviews.id(reviewId).remove();
        book.save((err, updateGame) => {
            const response = { status: 204 };
            if (err) {
                console.log("Error finding game");
                response.status = 500;
                response.message = err;
            }
            res.status(response.status).json(response.message);
        });
    });
}