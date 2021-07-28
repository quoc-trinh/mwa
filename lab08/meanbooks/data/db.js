const mongoose = require("mongoose");
require("./bookSchema");

const dbUrl = process.env.DB_URL + process.env.DB_NAME;

mongoose.connect(dbUrl);
mongoose.connection.on("connected", () => console.log("Mongoose is connected to", dbUrl));
mongoose.connection.on("disconnected", () => console.log("Mongoose is disconected to", dbUrl));
mongoose.connection.on("error", () => console.log("Error happen when connecting to", dbUrl));

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Mongo is discconected by application");
    })
});