/*
sql - tables - columes - row
nosql - collections - document jsonobject {"key":"value"}
 */
/*query parms 
/student?key=value 
parms 
/student/id
 */
/*create - update - get all - get one - delete */
const StudentModel = require('../models/student.model');
exports.getStudents = async function (req, res) {
    let filters = req.query;
    console.log(filters);
    let filtersObj = {};
    if (filters?.name) {
        filtersObj.name = filters?.name
    }
    if (filters?.age) {
        filtersObj.age = filters?.age
    }
    let students = await StudentModel.find(filtersObj, { password: 0 }).populate('department');
    console.log(students);
    res.status(200).json(students);

}
exports.addStudent = async (req, res, next) => {
    let body = req.body;
    let student = await StudentModel.create(body);
    res.status(201).json(student);
}
exports.updateStudent = async (req, res, next) => {
    let body = req.body;
    let student = await StudentModel.findByIdAndUpdate(body.id, body);
    student?.save();
    res.status(200).json(student);
}
exports.getStudentById = async (req, res, next) => {
    try {
        let params = req.params;

        let student = await StudentModel.findById(params?.id);
        if (student) {

            res.status(200).json(student);
        }

        else {
            let err = new Error('there is no student with this id');
            err.status = 400
            next(err);
        }
    }
    catch (err) {
        err.status = 500;
        next(err);
    }

}

exports.login = async (req, res, next) => {

    try {
        let body = req.body;
        let student = await StudentModel.findOne({ name: body.name });
        if (student) {
            console.log(student, "student password form db data")
            if (student.password == body?.password) {
                res.status(200).json({ id: student?._id });
            }
            else {
                let err = new Error("wrong password");
                err.status = 400;
                next(err);
            }
        }
        else {
            let err = new Error("student not found");
            err.status = 400;
            next(err);
        }
    }
    catch (err) {
        err.status = 500;
        next(err);
    }

}
exports.deleteStudentByID = async (req, res, next) => {
    try {
        let params = req.params;

        let student = await StudentModel.findByIdAndDelete(params?.id);
        if (student) {
            res.status(200).json({ message: `Student ${student.name} has been deleted ` });
        }
        else {
            let err = new Error(`there is no student with this id : ${params?.id} `);
            err.status = 400
            next(err);
        }
    }
    catch (err) {
        err.status = 500;
        next(err);
    }

}