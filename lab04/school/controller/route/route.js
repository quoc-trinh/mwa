const express = require("express");
const studentController = require("../controller/students.controller");
const courseController = require("../controller/courses.controller");

const router = express.Router();

router.route("/students").get(studentController.students);
router.route("/students/:studentId").get(studentController.getStudent);

router.route("/students/:studentId/courses").get(courseController.course);
router.route("/students/:studentId/courses/:courseId").get(courseController.getCourse);

module.exports = router;