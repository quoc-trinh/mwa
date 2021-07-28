const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const Game = mongoose.model("Game");

module.exports.games = (req, res) => {
    let offset = parseInt(process.env.DEFAULT_OFFSET);
    let count = parseInt(process.env.DEFAULT_COUNT);

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status(StatusCodes.BAD_REQUEST).json({
            "message": "QueryString Offset and Count should be numbers "
        });
        return;
    }

    Game.find().skip(offset).limit(count).exec((err, games) => {
        if (err) {
            console.log("Error finding games");
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        } else {
            console.log("Found games", games.length);
            res.status(StatusCodes.OK).json(games);
        }
    });
}

module.exports.getGame = (req, res) => {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game) {
        if (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        } else if (!game) {
            res.status(StatusCodes.NOT_FOUND).json({ "message": "Game ID not found" });
        } else {
            res.status(StatusCodes.OK).json(game);
        }
    });
}

const copyGameFromRequest = (req, game) => {
    game.title = req.body.title;
    game.year = parseInt(req.body.year);
    game.price = parseFloat(req.body.price);
    game.designer = req.body.designer;
    game.minPlayers = parseInt(req.body.minPlayers);
    game.maxPlayers = parseInt(req.body.maxPlayers);
    game.rate = parseFloat(req.body.rate);
}

module.exports.addGame = (req, res) => {
    console.log(req.body);
    const game = {};
    copyGameFromRequest(req, game);
    Game.create(game,
        (err, game) => {
            if (err) {
                console.log("Error creating games");
                res.status(StatusCodes.BAD_REQUEST).json(err);
            } else {
                console.log("Game created", game);
                res.status(StatusCodes.CREATED).json(game);
            }
        });
};

module.exports.updateFullGame = (req, res) => {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function(err, game) {
        const response = {
            status: 204,
            message: game
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            getGameFromRequest(req, game);
            game.save((err, updatedGame) => {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
            });
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.updatePartialGame = (req, res) => {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function(err, game) {
        const response = {
            status: 204,
            message: game
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }

        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            if (req.body.title) {
                game.title = req.body.title;
            }
            if (parseInt(req.body.year)) {
                game.year = parseInt(req.body.year);
            }
            if (parseInt(req.body.price)) {
                game.price = parseFloat(req.body.price);
            }
            if (parseInt(req.body.designer)) {
                game.designer = req.body.designer;
            }
            if (parseInt(req.body.minPlayers)) {
                game.minPlayers = parseInt(req.body.minPlayers);
            }
            if (parseInt(req.body.maxPlayers)) {
                game.maxPlayers = parseInt(req.body.maxPlayers);
            }
            if (parseInt(req.body.rate)) {
                game.rate = parseFloat(req.body.rate);
            }

            game.save((err, updatedGame) => {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
            });
            res.status(response.status).json(response.message);
        }

    });
};

module.exports.deleteGame = function(req, res) {
    const gameId = req.params.gameId;
    console.log("DELETE gameId ", gameId);
    Game.findByIdAndRemove(gameId).exec((err, deletedGame) => {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!deletedGame) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};