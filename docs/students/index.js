import addStudent from './addStudent.js';
import deleteStudent from './delStudent.js';

export default {
  paths: {
    '/addStudent': {
      ...addStudent,
    },
    '/deleStudent/:id': {
      ...deleteStudent,
    },
  },
};
