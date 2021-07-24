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
        if (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        } else if (!student) {
            res.status(StatusCodes.NOT_FOUND).json({ "message": "Student ID not found" });
        } else {
            res.status(StatusCodes.OK).json(student.courses.id(courseId));
        }
    });
}

module.exports.addCourse = (req, res) => {
    const studentId = req.params.studentId;
    Students.findById(studentId).select("courses").exec((err, student) => {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding student while adding review");
            response.status = 500;
            response.message = err;
        } else if (!student) {
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            _addCourse(req, res, student);
        }
    })
};

const _addCourse = (req, res, student) => {
    const course = {
        name: req.body.name
    }
    console.log(student.courses);
    student.courses.push(course);

    student.save((err, updateStudent) => {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding student");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}