const mongoose = require("mongoose");
const Game = mongoose.model("Game");

const runGeoQuery = (req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const query = {
        "publisher.location": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: 1000,
                $minDistance: 0
            }
        }
    }
    Game.find(query).exec(function(err, games) {
        if (err) {
            console.log("Error ", err);
        }
        console.log("Found games", games);
        res.status(200).json(games);
    });
};

module.exports.findPublishers = (req, res) => {
    runGeoQuery(req, res);
}
module.exports.publishers = (req, res) => {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game) {
        res.json(game.publisher);
    });
}

const _updatePublisher = (req, res, game) => {
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;
    game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];

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
module.exports.updatePublisher = (req, res) => {
    const gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("-reviews").exec((err, game) => {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game while update publisher");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            _updatePublisher(req, res, game);
        }
    })
};