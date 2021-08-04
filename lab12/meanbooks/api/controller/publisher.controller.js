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
        book.save()
            .then(handleNoContentResponseSucess.bind(null, res))
            .catch(handleInternalError.bind(null, res));
    });
}

module.exports.deletePublisher = (req, res) => {
    findBookAndUpdate(req, res, (req, res, book) => {
        book.publisher.name = undefined;
        book.publisher.location = undefined;
        book.save()
            .then(handleNoContentResponseSucess.bind(null, res))
            .catch(handleInternalError.bind(null, res));
    });
}

const handleNoContentResponseSucess = (res) => {
    res.status(204).json("");
}

const handleInternalError = (res, err) => {
    console.log("Error finding games");
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
}