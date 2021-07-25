const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
    type: {
        type: String
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const publisherSchema = new mongoose.Schema({
    name: String,
    location: pointSchema
});

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    }
});

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: [],
        requried: true
    },
    pages: Number,
    price: Number,
    isbn10: {
        type: String,
        min: 10
    },
    isbn13: {
        type: String,
        min: 13
    },
    publisheDate: Date,
    publisher: {
        type: publisherSchema,
        default: {}
    },
    reviews: [reviewSchema]
});

mongoose.model("Book", bookSchema, "book");