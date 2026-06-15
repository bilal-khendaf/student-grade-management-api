import { check, validationResult } from 'express-validator';

export const validationAddEvaluation = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Evaluation name is required.')
    .isLength({ min: 5 })
    .withMessage('Evaluation name must be at least 5 characters long.')
];

export const validationEditEvaluation = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('ID is required')
];

export const addEvalValidation = (req, res, next) => {
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
