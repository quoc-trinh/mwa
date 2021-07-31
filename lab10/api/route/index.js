const express = require("express");
const jobsController = require("../controller/jobs.controller");
const reviewController = require("../controller/reviews.controller");

const router = express.Router();

router.route('/jobs')
    .get(jobsController.jobs)
    .post(jobsController.addJob);

router.route('/jobs/:jobId')
    .get(jobsController.job)
    .put(jobsController.updateFullJob)
    .patch(jobsController.updatePartialJob)
    .delete(jobsController.deleteJob)

router.route("/jobs/:jobId/reviews")
    .get(reviewController.reviews)
    .put(reviewController.addReview);

router.route("/jobs/:jobId/reviews/:reviewId")
    .put(reviewController.updateReview)
    .delete(reviewController.deleteReview);

module.exports = router;