import { db } from '../database/db.js';

export const addResult = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      const { student_id, eval_id, note } = req.body;
      await db.run('INSERT INTO results (student_id, eval_id, note) VALUES (?, ?, ?)', [student_id, eval_id, note]);
      return res.status(201).json({
        message: 'Result created successfully'
      });
    } else {
      const results = req.body;
      for (const result of results) {
        await db.run('INSERT INTO results (student_id, eval_id, note) VALUES (?, ?, ?)', [result.student_id, result.eval_id, result.note]);
      }
      return res.status(201).json({
        message: 'Results created successfully'
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export const editResult = async (req, res) => {
  try {
    const { eval_id } = req.params;
    const { student_id, note } = req.body;
    await db.run('UPDATE results SET student_id = ?, note = ? WHERE eval_id = ?', [student_id, note, eval_id]);
    return res.status(201).json({
      message: 'Result updated successfully'
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const { eval_id } = req.params;
    await db.run('DELETE FROM results WHERE eval_id = ?', [eval_id]);
    return res.status(201).json({
      message: 'Result deleted successfully'
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};
