const StudentModel = require('../models/student.model');
module.exports = async (req, res, next) => {
    console.log("Auth Middleware");

    try {
        let auth = req.headers.token
        let student = await StudentModel.findById(auth);
        if (student) {
            next()
        }
        else {
            let err = new Error("No vaild to get depaertments ");
            err.status = 402;
            next(err);
        }
    }
    catch (err) {
        err.status = 500;
        next(err);
    }

}