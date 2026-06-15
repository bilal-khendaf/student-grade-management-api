import express from 'express';
import swaggerUi from 'swagger-ui-express';
import multer from 'multer';
import docs from './docs/index.js';

import auth from './middleware/auth.js';
import {
  validateUserSignUp,
  registerValidation,
  validateUserLogin,
  loginValidation,
} from './middleware/validation/user.js';
import { registerUser, loginUser, insertUserCSV } from './controllers/user.js';
import {
  validationAddStudent,
  addStudentValidation,
  validationEditStudent,
} from './middleware/validation/student.js';
import {
  addStudent,
  editStudent,
  deleteStudent,
  addStudentImage,
} from './controllers/student.js';
import {
  validationAddEvaluation,
  addEvalValidation,
  validationEditEvaluation,
} from './middleware/validation/evaluation.js';
import { addEval, editEvaluation, delEval } from './controllers/evaluation.js';
import {
  validationAddResult,
  addResultValidation,
  validationEditResult,
} from './middleware/validation/results.js';
import { addResult, editResult, deleteResult } from './controllers/results.js';
import { printImage } from './controllers/utilities.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ dest: './uploads/', storage: storage }).single('file');
const uploadCSV = multer({ dest: './uploads/', storage: storage }).single('csv');

const app = express();
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

app.use(router);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

router.get('/getFile/:fileName', printImage);

router.post('/signup', validateUserSignUp, registerValidation, registerUser);
router.post('/login', validateUserLogin, loginValidation, loginUser);
router.post('/addStudent', auth, validationAddStudent, addStudentValidation, addStudent);
router.post('/addEvaluation', auth, validationAddEvaluation, addEvalValidation, addEval);
router.post('/addResult', auth, validationAddResult, addResultValidation, addResult);
router.post('/csv', uploadCSV, insertUserCSV);

router.put('/editStudent/:id', auth, validationAddStudent, addStudentValidation, editStudent);
router.put('/editEvaluation/:id', auth, validationAddEvaluation, addEvalValidation, editEvaluation);
router.put('/editResult/:id', auth, validationEditResult, addResultValidation, editResult);
router.put('/student/:id/image', upload, addStudentImage);

router.delete('/delStudent/:id', auth, validationEditStudent, addStudentValidation, deleteStudent);
router.delete('/delEvaluation/:id', auth, validationEditEvaluation, addEvalValidation, delEval);
router.delete('/delResult/:eval_id', auth, validationEditResult, addResultValidation, deleteResult);

export default app;
