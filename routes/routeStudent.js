const express = require("express");
const routerStudent = express.Router();

const StudentController = require("../controllers/studentController");

routerStudent.post("/student", StudentController.postNoviStudent);

routerStudent.put("/student/:index", StudentController.putGrupaStudenta);

routerStudent.post("/batch/student", StudentController.postBatchStudenata);

module.exports = routerStudent;
