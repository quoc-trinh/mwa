const express = require("express");
const studentController = require("../controller/students.controller");
const courseController = require("../controller/courses.controller");

const router = express.Router();

router.route("/students")
    .get(studentController.students)
    .post(studentController.createStudent);

router.route("/students/:studentId")
    .get(studentController.getStudent)
    .put(studentController.updateFullStudent)
    .patch(studentController.updatePartialStudent)
    .delete(studentController.deleteStudent);;

router.route("/students/:studentId/courses")
    .get(courseController.course)
    .put(courseController.addCourse);

router.route("/students/:studentId/courses/:courseId")
    .get(courseController.getCourse);

module.exports = router;