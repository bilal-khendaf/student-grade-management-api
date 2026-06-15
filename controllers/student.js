import { db } from '../database/db.js';

export const addStudent = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      const { first_name, last_name, email } = req.body;
      await db.run('INSERT INTO students (first_name, last_name, email) VALUES (?, ?, ?)', [first_name, last_name, email]);
      return res.status(201).json({
        message: 'Student created successfully'
      });
    } else {
      const students = req.body;
      for (const student of students) {
        await db.run('INSERT INTO students (first_name, last_name, email) VALUES (?, ?, ?)', [student.first_name, student.last_name, student.email]);
      }
      return res.status(201).json({
        message: 'Students created successfully'
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export const editStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;
    await db.run('UPDATE students SET first_name = ?, last_name = ?, email = ? WHERE id = ?', [first_name, last_name, email, id]);
    return res.status(201).json({
      message: 'Student updated successfully'
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM results WHERE student_id = ?', [id]);
    await db.run('DELETE FROM students WHERE id = ?', [id]);
    return res.status(201).json({
      message: 'Student deleted successfully'
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export const addStudentImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    await db.run('UPDATE students SET image = ? WHERE id = ?', [req.file.path, id]);
    return res.send(req.file);
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};
