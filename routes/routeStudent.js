const path = require("path");
const express = require("express");
const routerStudent = express.Router();

const StudentController = require("../controllers/studentController");

routerStudent.post("/", StudentController.postNoviStudent);

routerStudent.put("/:index", StudentController.putGrupaStudenta);

routerStudent.post("/batch/student", StudentController.postBatchStudenata);

module.exports = routerStudent;
