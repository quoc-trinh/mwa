const dbconnection = require("../../data/dbconnection");

module.exports.games = (req, res) => {
    let count = 5;
    let offset = 0;
    const maximumCount = 7;

    const db = dbconnection.get();
    const collection = db.collection("games");

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
        if (count > maximumCount) {
            res.status(400).json({ error: "The count parameter should be less than or equal" + maximumCount });
            return;
        }
    }
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    collection.find().skip(offset).limit(count).toArray((err, games) => {
        res.json(games);
    });
}