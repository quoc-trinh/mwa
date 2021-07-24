const mongoose = require("mongoose");
const Students = mongoose.model("Students");
const { StatusCodes } = require("http-status-codes");

module.exports.students = (req, res) => {
    let offset = parseInt(process.env.DEFAULT_OFFSET);
    let count = parseInt(process.env.DEFAULT_COUNT);

    if (req.query) {
        if (req.query.offset) {
            offset = parseInt(req.query.offset);
        }
        if (req.query.count) {
            offset = parseInt(req.query.count);
        }
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status(StatusCodes.BAD_REQUEST).json({
            "message": "QueryString Offset and Count should be numbers "
        });
        return;
    }

    Students.find().skip(offset).limit(count).exec((err, students) => {
        if (err) {
            console.log("Error finding students");
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        } else {
            console.log("Found students", students.length);
            res.status(StatusCodes.OK).json(students);
        }
    })
}

module.exports.getStudent = (req, res) => {
    const studentId = req.params.studentId;
    Students.findById(studentId).exec((err, student) => {
        if (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        } else if (!student) {
            res.status(StatusCodes.NOT_FOUND).json({ "message": "Student ID not found" });
        } else {
            res.status(StatusCodes.OK).json(student);
        }
    });
}


const copyStudentFromRequest = (req, student) => {
    student.name = req.body.name;
    student.gpa = parseFloat(req.body.gpa);
    console.log("Copied Student: ", student);

}

module.exports.createStudent = (req, res) => {
    console.log(req.body);
    const student = {};
    copyStudentFromRequest(req, student);
    Students.create(student,
        (err, student) => {
            if (err) {
                console.log("Error creating student");
                res.status(StatusCodes.BAD_REQUEST).json(err);
            } else {
                console.log("Student added", student);
                res.status(StatusCodes.CREATED).json(student);
            }
        });
};

module.exports.updateFullStudent = (req, res) => {
    const studentId = req.params.studentId;
    Students.findById(studentId).select("-course").exec(function(err, student) {
        const response = {
            status: 204,
            message: student
        };
        if (err) {
            console.log("Error finding student");
            response.status = 500;
            response.message = err;
        } else if (!student) {
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            copyStudentFromRequest(req, student);
            console.log("Student: ", student);
            student.save((err, updateStudent) => {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
            });
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.updatePartialStudent = (req, res) => {
    const studentId = req.params.studentId;
    Students.findById(studentId).select("-courses").exec(function(err, student) {
        const response = {
            status: 204,
            message: student
        };
        if (err) {
            console.log("Error finding student");
            response.status = 500;
            response.message = err;
        } else if (!student) {
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }

        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            if (req.body.name) {
                student.title = req.body.name;
            }
            if (parseInt(req.body.gpa)) {
                student.year = parseFloat(req.body.gpa);
            }
            student.save((err, updatedStudent) => {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
            });
            res.status(response.status).json(response.message);
        }
    });
};

module.exports.deleteStudent = (req, res) => {
    const studentId = req.params.studentId;
    console.log("DELETE studentId ", studentId);
    Students.findByIdAndRemove(studentId).exec((err, deletedStudent) => {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding student");
            response.status = 500;
            response.message = err;
        } else if (!deletedStudent) {
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};