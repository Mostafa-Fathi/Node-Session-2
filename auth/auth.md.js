const jwt = require('jsonwebtoken');
const StudentModel = require('../models/student.model');

module.exports = async (req, res, next) => {
    console.log("Auth Middleware");

    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'your_secret_key', async (err, decoded) => {
            if (err) {
                let error = new Error("Invalid or expired token");
                error.status = 401;
                next(error);
            } else {
                let student = await StudentModel.findById(decoded.id);
                if (student) {
                    next();
                } else {
                    let error = new Error("No valid student found");
                    error.status = 402;
                    next(error);
                }
            }
        });
    } catch (err) {
        err.status = 500;
        next(err);
    }
}
