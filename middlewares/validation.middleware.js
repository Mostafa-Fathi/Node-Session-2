const { check, validationResult } = require('express-validator');

const validateDepartment = [
  check('name').notEmpty().withMessage('Name is required'),
  check('location').notEmpty().withMessage('Location is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateStudent = [
  check('name').notEmpty().withMessage('Name is required'),
  check('age').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
  check('gender').isIn(['Male', 'Female']).withMessage('Gender must be either Male or Female'),
  check('department').notEmpty().withMessage('Department is required'),
  check('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateDepartment,
  validateStudent
};
