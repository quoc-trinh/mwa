const express = require("express");
const router = require("./api/route");

require("dotenv").config();

const app = express();

app.use(express.static(process.env.PUBLIC_FOLDER));
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.use("/api", router);

const server = app.listen(process.env.PORT, () => {
    console.log("The server is running on port", server.address().port);
})