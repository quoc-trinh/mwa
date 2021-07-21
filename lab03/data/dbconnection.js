require("dotenv").config();

const Mongoclient = require("mongodb").MongoClient;

const dbUrl = process.env.DB_URL + process.env.DB_NAME;

let _connection = null;

console.log("Database url", dbUrl);

const open = () => Mongoclient.connect(dbUrl, (err, clien) => {
    if (err) {
        console.log("Cannot connect to db", err);
        return;
    }
    _connection = clien.db(process.env.DB_NAME);
    console.log("Database is connected", _connection);
});

const get = () => {
    return _connection;
}

module.exports = { open, get }