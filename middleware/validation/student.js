import { check, validationResult } from 'express-validator';

export const validationAddStudent = [
  check('first_name')
    .not()
    .isEmpty()
    .withMessage('First name is required')
    .isLength({ min: 5, max: 20 })
    .withMessage('First name must contain between 5 and 20 characters'),
  check('last_name')
    .not()
    .isEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 5, max: 20 })
    .withMessage('Last name must contain between 5 and 20 characters'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address')
];

export const validationEditStudent = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('ID is required')
];

export const addStudentValidation = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  const errors = result.array().map(err => err.msg);
  return res.status(400).json({
    success: false,
    message: errors
  });
};
