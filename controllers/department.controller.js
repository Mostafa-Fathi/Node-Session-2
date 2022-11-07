const DepartmentModel = require('../models/department.model');
exports.getDepartments = async function (req, res) {

    let departments = await DepartmentModel.find();
    console.log(departments);
    res.status(200).json(departments);

}
exports.addDepartment = async (req, res, next) => {
    let body = req.body;
    let deparment = await DepartmentModel.create(body);
    res.status(201).json(deparment);
}