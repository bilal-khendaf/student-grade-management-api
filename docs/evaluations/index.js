import addEvaluation from './addEvaluation.js';
import delEvaluation from './delEvaluation.js';

export default {
  paths: {
    '/addEvaluation': {
      ...addEvaluation,
    },
    '/delEvaluation/:id': {
      ...delEvaluation,
    },
  },
};
