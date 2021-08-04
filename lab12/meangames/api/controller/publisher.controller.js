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
    Game.find(query).exec()
        .then(handleFindGamesResponse.bind(null, res))
        .catch(handleInternalError.bind(null, res));

};

module.exports.findPublishers = (req, res) => {
    runGeoQuery(req, res);
}
module.exports.publishers = (req, res) => {
    const gameId = req.params.gameId;

    Game.findById(gameId).select("publisher").exec()
        .then(handlePublishersResponse.bind(null, res))
        .catch(handleInternalError.bind(null, err));
}

module.exports.getPublisher = (req, res) => {
    const gameId = req.params.gameId;
    const publisherId = req.params.publisherId;

    Game.findById(gameId).exec()
        .then(handlePublisherResponse.bind(null, res, publisherId))
        .catch(handleInternalError.bind(null, res));
}

const _updatePublisher = (req, res, game) => {
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;
    game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];

    game.save()
        .then(handleNoContentResponseSucess.bind(null, res))
        .catch(handleInternalError.bind(null, res));
}
module.exports.updatePublisher = (req, res) => {
    const gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("publisher").exec()
        .then(handleUpdatePublisher.bind(null, res, req))
        .catch(handleInternalError.bind(null, res));

};

function handleUpdatePublisher(res, req, game) {
    const response = { status: 204 };
    if (!game) {
        response.status = 404;
        response.message = { "message": "Game ID not found" };
    }
    if (response.status !== 204) {
        res.status(response.status).json(response.message);
    } else {
        _updatePublisher(req, res, game);
    }
}

function handlePublisherResponse(res, publisherId, game) {
    res.json(game.publisher.id(publisherId));
}

function handlePublishersResponse(res, game) {
    res.status(200).json(game.publisher);
}

function handleFindGamesResponse(res, games) {
    res.status(200).json(games);
}

const handleInternalError = (res, err) => {
    res.status(500).json(err);
}