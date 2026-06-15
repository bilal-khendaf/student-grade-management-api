import { check, validationResult } from 'express-validator';

export const validateUserSignUp = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 50 })
    .withMessage('The name field cannot be empty and must be between 5 and 50 characters.'),
  check('email').normalizeEmail()
    .isEmail()
    .withMessage('Email is invalid'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 8 and 20 characters'),
];

export const validateUserLogin = [
  check('email').normalizeEmail()
    .isEmail()
    .withMessage('Email is invalid'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 8 and 20 characters'),
];

export const registerValidation = (req, res, next) => {
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

export const loginValidation = (req, res, next) => {
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
