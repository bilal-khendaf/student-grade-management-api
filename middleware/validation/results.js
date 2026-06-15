import { check, validationResult } from 'express-validator';

export const validationAddResult = [
  check('student_id')
    .not()
    .isEmpty()
    .withMessage('Student ID is required'),
  check('eval_id')
    .not()
    .isEmpty()
    .withMessage('Evaluation ID is required'),
  check('note')
    .not()
    .isEmpty()
    .withMessage('Grade note is required')
    .isNumeric()
    .isInt({ min: 0, max: 100 })
    .withMessage('Grade note must be between 0 and 100'),
];

export const validationEditResult = [
  check('eval_id')
    .not()
    .isEmpty()
    .withMessage('Evaluation ID is required')
];

export const addResultValidation = (req, res, next) => {
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
