const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
    type: { type: String },
    coordinates: { type: [Number], required: true }
});

const locationSchema = new mongoose.Schema({
    city: String,
    location: pointSchema
});

const reviewSchema = new mongoose.Schema({
    name: { type: String, require: true },
    comment: { type: String, require: true }
});

const jobSchema = new mongoose.Schema({
    title: { type: String, require: true },
    salary: { type: String, require: true },
    location: locationSchema,
    description: { type: String, require: true },
    experience: String,
    skills: [String],
    postDate: Date,
    reviews: [reviewSchema]
});

mongoose.model("Jobs", jobSchema, "jobs");