const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/department.controller');
const { validateDepartment } = require('../middlewares/validation.middleware');

router.post("/", validateDepartment, DepartmentController.addDepartment);
router.get("/", DepartmentController.getDepartments);

module.exports = router;
