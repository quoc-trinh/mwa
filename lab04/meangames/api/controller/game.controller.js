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

module.exports.games = (req, res) => {
    let offset = process.env.DEFAULT_OFFSET;
    let count = process.env.DEFAULT_COUNT;
    console.log("receive");
    if (req.query) {
        if (req.query.offset) {
            offset = req.query.offset;
        }
        if (req.query.count) {
            offset = req.query.count;
        }
    }
    Game.find().skip(parseInt(offset)).limit(parseInt(count)).exec((err, games) => {
        res.json(games);
    });
}

module.exports.games = (req, res) => {
    let offset = process.env.DEFAULT_OFFSET;
    let count = process.env.DEFAULT_COUNT;
    console.log("receive");
    if (req.query) {
        if (req.query.offset) {
            offset = req.query.offset;
        }
        if (req.query.count) {
            offset = req.query.count;
        }
    }
    Game.find().skip(parseInt(offset)).limit(parseInt(count)).exec((err, games) => {
        res.json(games);
    });
}

module.exports.getGame = (req, res) => {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game) {
        res.status(200).json(game);
    });
}