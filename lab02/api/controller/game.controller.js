const gamesData = require("../../data/games.json");

module.exports.games = (req, res) => {
    let count = 5;
    let offset = 0;

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    res.json(gamesData.slice(offset, offset + count));
}