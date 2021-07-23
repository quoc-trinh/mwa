const mongoose = require("mongoose");
const Students = mongoose.model("Students");

module.exports.course = (req, res) => {
    const studentId = req.params.studentId;
    Students.findById(studentId).select("courses").exec((err, student) => {
        res.json(student.courses);
    });
}

module.exports.getCourse = (req, res) => {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;

    Students.findById(studentId).select("courses").exec((err, student) => {
        res.json(student.courses.id(courseId));
    });
}