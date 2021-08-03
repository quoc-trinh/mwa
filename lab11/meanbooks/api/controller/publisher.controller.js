const mongoose = require("mongoose");
const { findBookAndUpdate } = require("./book.controller");

module.exports.publisher = (req, res) => {
    findBookAndUpdate(req, res, (req, res, book) => {
        console.log(book);
        res.status(200).json(book.publisher);
    });
}

module.exports.addPublisher = (req, res) => {
    findBookAndUpdate(req, res, (req, res, book) => {
        const publisher = {
            name: req.body.name,
            location: {
                coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            }
        };
        book.publisher = publisher;
        book.save((err, updateGame) => {
            const response = { status: 204 };
            if (err) {
                console.log("Error finding game");
                response.status = 500;
                response.message = err;
            }
            res.status(response.status).json(response.message);
        });
    });
}

module.exports.deletePublisher = (req, res) => {
    findBookAndUpdate(req, res, (req, res, book) => {
        book.publisher.name = undefined;
        book.publisher.location = undefined;

        book.save((err, updateGame) => {
            const response = { status: 204 };
            if (err) {
                console.log("Error finding game");
                response.status = 500;
                response.message = err;
            }
            res.status(response.status).json(response.message);
        });
    });
}