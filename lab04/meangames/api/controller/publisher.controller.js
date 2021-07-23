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

module.exports.getPublisher = (req, res) => {
    const gameId = req.params.gameId;
    const publisherId = req.params.publisherId;

    Game.findById(gameId).exec(function(err, game) {
        console.log(game.publisher);
        res.json(game.publisher.id(publisherId));
    });
}