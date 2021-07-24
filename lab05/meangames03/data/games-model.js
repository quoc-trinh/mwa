const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    established: {
        type: Date,
        required: false
    },
    location: {
        address: String,
        //longitude (E/W), latitude (N/S)
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    }
});

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    }
});

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    year: Number,
    price: Number,
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 10,
    },
    designer: [String],
    publisher: publisherSchema,
    reviews: [reviewSchema]

});

//combine the model
mongoose.model("Game", gameSchema, "games");