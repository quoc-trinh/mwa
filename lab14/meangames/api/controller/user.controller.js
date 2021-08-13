var mongoose = require("mongoose");
var User = mongoose.model("Users");

var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

module.exports.register = (req, res) => {
    console.log("Registering user");
    var username = req.body.username;
    var name = req.body.name || null;
    bcrypt.genSalt(10)
        .then(handleGetSaltSuccess.bind(null, req, username, name, res))
};

module.exports.login = (req, res) => {
    console.log("Logging in user");
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username }).exec()
        .then(handleFindUserSuccess.bind(null, password, res))
        .catch(handleInternalError.bind(null, res));
};

module.exports.authenticate = (req, res, next) => {
    var headerExists = req.headers.authorization;
    if (headerExists) {
        var token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "cs572", function(err, decoded) {
            if (err) {
                console.log(err);
                res.status(401).json("Unauthorized");
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else { res.status(403).json("No token provided"); }
};

function handleFindUserSuccess(password, res, user) {
    if (user) {
        console.log("Logging in user", user.password);
        if (bcrypt.compareSync(password, user.password)) {
            console.log("user found", user);
            var token = jwt.sign({ username: user.username }, "cs572", { expiresIn: 3600 });
            res.status(200).json({ success: true, token: token });
        } else { res.status(401).json("Unauthorized"); }
    } else {
        console.log("user not found", user);
        res.status(400).json("Unauthorized");
    }
}

function handleGetSaltSuccess(req, username, name, res, salt) {
    bcrypt.hash(req.body.password, salt)
        .then(handleGeneratePasswordSucess.bind(null, username, name, res));
}

function handleGeneratePasswordSucess(username, name, res, password) {
    User.create({ username: username, name: name, password: password })
        .then(handleCreateUserResponse.bind(null, res))
        .catch(handleInternalError.bind(null, res));
}

function handleCreateUserResponse(res, user) {
    res.status(200).json(user);
}

const handleInternalError = (res, err) => {
    res.status(500).json(err);
}