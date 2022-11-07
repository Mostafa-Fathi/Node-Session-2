const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/department.controller');

router.post("/", DepartmentController.addDepartment);
router.get("/", DepartmentController.getDepartments);

module.exports = router