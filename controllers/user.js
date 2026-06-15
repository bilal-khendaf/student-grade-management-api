import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import csv from 'csv-parser';
import { db } from '../database/db.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    
    const row = await db.get('SELECT * FROM user WHERE email = ?', [email]);
    if (row) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }
    
    await db.run('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, hashPassword]);
    return res.status(201).json({
      message: 'User created successfully'
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error registering user',
      error: err.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const row = await db.get('SELECT * FROM user WHERE email = ?', [email]);
    if (!row) {
      return res.status(401).json({
        error: 'User not found'
      });
    }
    
    const isMatch = await bcrypt.compare(password, row.password);
    if (isMatch) {
      const token = jwt.sign({
        id: row.id,
        nom: row.nom,
        email: row.email
      }, process.env.TOKEN_KEY, {
        expiresIn: '4h'
      });
      return res.status(200).json({
        message: 'User successfully logged in',
        token: token
      });
    } else {
      return res.status(401).json({
        error: 'Incorrect password'
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export const insertUserCSV = (req, res) => {
  const users = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      const user = {
        name: row.name,
        email: row.email,
        password: bcrypt.hashSync(row.password, 10)
      };
      users.push(user);
    })
    .on('end', async () => {
      try {
        for (const user of users) {
          const row = await db.get('SELECT * FROM user WHERE email = ?', [user.email]);
          if (!row) {
            await db.run('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
          }
        }
      } catch (err) {
        console.error('Error inserting CSV users:', err);
      }
    });
  
  return res.json({
    success: true,
    message: 'User(s) created successfully'
  });
};
