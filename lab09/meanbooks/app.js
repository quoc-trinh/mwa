const express = require("express");
require("dotenv").config();
require("./data/db");

const router = require("./api/route");

const app = express();
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/node_modules", express.static("node_modules"))
app.use(express.static(process.env.PUBLIC_FOLDER))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", router);

const server = app.listen(process.env.PORT, () => {
    console.log("Server is running at", server.address().port);
});