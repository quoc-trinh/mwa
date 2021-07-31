const mongoose = require("mongoose");
require("./model");

const dbUrl = process.env.DB_URL + process.env.DB_NAME
mongoose.connect(dbUrl);

mongoose.connection.on("connected", () => console.log("Mongoose is connected to", dbUrl));
mongoose.connection.on("disconnected", () => console.log("Mongoose is disconnected to", dbUrl));
mongoose.connection.on("error", () => console.log("Cannot connect to Mongoose with", dbUrl));

process.on("SIGINT", () => mongoose.connection.close(() => {
    console.log("Mongoose connection is close");
    process.exit(1);
}));