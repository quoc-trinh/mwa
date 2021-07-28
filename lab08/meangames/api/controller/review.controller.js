const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.reviews = (req, res) => {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(err, game) {
        res.json(game.reviews);
    });
}

module.exports.addReviews = (req, res) => {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec((err, game) => {
        const response = {
            status: 204,
            message: game
        };

        if (err) {
            console.log("Error finding game while adding review");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            _addReviews(req, res, game);
        }
    })
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

    game.save((err, updateGame) => {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}