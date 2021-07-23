const mongoose = require("mongoose");
require("./games-model");

const dbUrl = process.env.DB_URL + process.env.DB_NAME;

mongoose.connect(dbUrl);
mongoose.connection.on("connected", () => console.log("Mongoose connected to", dbUrl));
mongoose.connection.on("disconnected", () => console.log("Mongoose disconnected to", dbUrl));
mongoose.connection.on("error", () => console.log("Mongoose disconnected to", dbUrl));


//Application is interupted
process.on("SIGINT", () => mongoose.connection.close(() => {
    console.log("Mongoose is disconnected by application");
    process.exit(0);
}));