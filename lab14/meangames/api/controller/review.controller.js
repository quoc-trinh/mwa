const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.reviews = (req, res) => {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec()
        .then(handleGetReviewResponse.bind(null, res))
        .catch(handleInternalError.bind(null, res));
}

module.exports.addReviews = (req, res) => {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec()
        .then(handleAddReviewReponse.bind(null, res, req))
        .catch(handleInternalError.bind(null, res));
};

const _addReviews = (req, res, game) => {
    const review = {
        name: req.body.name,
        review: req.body.review,
        date: req.body.date
    }

    if (!game.reviews) {
        game.reviews = [];
    }
    game.reviews.push(review);
    game.save()
        .then(handleNoContentResponseSucess.bind(null, res))
        .catch(handleInternalError.bind(null, res));;
}

const handleInternalError = (res, err) => {
    res.status(500).json(err);
}

function handleGetReviewResponse(res, game) {
    res.json(game.reviews);
}

function handleAddReviewReponse(res, req, game) {
    if (!game) {
        response.status = 404;
        response.message = { "message": "Game ID not found" };
    }
    if (response.status !== 204) {
        res.status(response.status).json(response.message);
    } else {
        _addReviews(req, res, game);
    }
}

const handleNoContentResponseSucess = (res) => {
    res.status(204).json("");
}