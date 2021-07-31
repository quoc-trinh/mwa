const mongoose = require("mongoose");
const { jobs } = require("./jobs.controller");
const Jobs = mongoose.model("Jobs");

module.exports.reviews = (req, res) => {
    findJobAndUpdate(req, res, (req, res, job) => {
        res.status(200).json(job.reviews);
    });
}

module.exports.addReview = (req, res) => {
    findJobAndUpdate(req, res, (req, res, job) => {
        const review = {
            name: req.body.name,
            comment: req.body.comment
        }
        if (!job.reviews) {
            job.reviews = [];
        }
        job.reviews.push(review);
        console.log(review);

        console.log(job);

        job.save((err, job) => {
            const response = { status: 204 };
            if (err) {
                console.log("Error finding game");
                response.status = 500;
                response.message = err;
            }
            console.log(job);
            res.status(response.status).json(response.message);
        });
    });
}

module.exports.updateReview = (req, res) => {
    findJobAndUpdate(req, res, (req, res, job) => {
        const reviewId = req.params.reviewId;
        const review = job.reviews.id(reviewId);

        if (!review) {
            res.status(404).json(`{message: review ${reviewId} not found}`);
            return;
        }

        review.name = req.body.name;
        review.comment = req.body.comment;

        job.save((err, updateGame) => {
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
    findJobAndUpdate(req, res, (req, res, job) => {
        const reviewId = req.params.reviewId;
        job.reviews.id(reviewId).remove();
        job.save((err, updateGame) => {
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

findJobAndUpdate = (req, res, updateMethod) => {
    const jobId = req.params.jobId;
    Jobs.findById(jobId).exec((err, job) => {
        const response = {
            status: 204,
            message: job
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!job) {
            response.status = 404;
            response.message = { "message": `Job with id ${jobId} not found` };
        }

        if (response.status != 204) {
            res.status(response.status).json(response.message);
        } else {
            updateMethod(req, res, job);
        }
    });
}