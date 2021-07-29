const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const bcrypt = require("bcrypt");

module.exports.register = (req, res) => {
    bcrypt.hash(req.password, () => {

    });

    const user = {
        name: req.name,
        username: req.username,
        //encrypt password
        //manage the blocking 
        password: req.password
    }

    Users.create(user, (error, user) => {
        if (error) {
            res.status(500).json("{message: error when creating the user}");
        } else {
            res.status(201).json(user);
        }
    });
}

module.exports.login = (req, res) => {
    Users.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.status(500).json(err);
        }
        if (user) {
            bcrypt.compare(res.body.password, user.password, (err, match) => {
                if (match) {
                    res.status(404).json("");
                } else {
                    res.status(404).json("");
                }
            });
        } else {
            res.status(404).json("");
        }
    });
}