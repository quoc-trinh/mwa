const mongoose = require("mongoose");
const Students = mongoose.model("Students");
module.exports.students = (req, res) => {
    let offset = process.env.DEFAULT_OFFSET;
    let count = process.env.DEFAULT_COUNT;
    if (req.query) {
        if (req.query.offset) {
            offset = req.query.offset;
        }
        if (req.query.count) {
            offset = req.query.count;
        }
    }
    Students.find().skip(parseInt(offset)).limit(parseInt(count)).exec((err, students) => {
        res.json(students);
    })
}

module.exports.getStudent = (req, res) => {
    const studentId = req.params.studentId;
    Students.findById(studentId).exec((err, student) => {
        res.status(200).json(student);
    });
}