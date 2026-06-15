import { db } from '../database/db.js';

export const addEval = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      const { name } = req.body;
      const row = await db.get('SELECT * FROM evaluation WHERE name = ?', [name]);
      if (row) {
        return res.status(400).json({
          message: 'Evaluation already exists'
        });
      }
      await db.run('INSERT INTO evaluation (name) VALUES (?)', [name]);
      return res.status(201).json({
        message: 'Evaluation created successfully'
      });
    } else {
      const evaluations = req.body;
      for (const evaluation of evaluations) {
        const row = await db.get('SELECT * FROM evaluation WHERE name = ?', [evaluation.name]);
        if (row) {
          console.log(`${evaluation.name}: Evaluation already exists`);
        } else {
          await db.run('INSERT INTO evaluation (name) VALUES (?)', [evaluation.name]);
        }
      }
      return res.status(201).json({
        message: 'Evaluations created successfully'
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export const editEvaluation = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    await db.run('UPDATE evaluation SET name = ? WHERE id = ?', [name, id]);
    return res.status(201).json({
      message: 'Evaluation updated successfully'
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export const delEval = async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM results WHERE eval_id = ?', [id]);
    await db.run('DELETE FROM evaluation WHERE id = ?', [id]);
    return res.status(201).json({
      message: 'Evaluation deleted successfully'
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};
