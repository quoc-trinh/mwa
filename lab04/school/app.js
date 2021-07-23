const express = require("express");
require("dotenv").config();
require("./data/db");
const router = require("./controller/route/route");

const app = express();

const server = app.listen(process.env.PORT, () => {
    console.log("The server is running at port", server.address().port);
});

app.use("/api", router);