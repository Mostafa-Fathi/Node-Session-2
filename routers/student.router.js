const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { validateStudent } = require('../middlewares/validation.middleware');

/*
post : create date -- 201
put : update -- 201 
get : fetch data 200 
deltle: det data 200 

*/

router.get("/:id", studentController.getStudentById);
router.delete("/:id", studentController.deleteStudentByID);
router.get("/", studentController.getStudents);

router.post("/", validateStudent, studentController.addStudent);
router.put("/", validateStudent, studentController.updateStudent);

module.exports = router;
