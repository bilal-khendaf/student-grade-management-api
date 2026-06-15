import sqlite3 from 'sqlite3';
import path from 'path';

const isTest = process.env.NODE_ENV === 'test';
const dbPath = isTest ? ':memory:' : path.resolve('database/school.sqlite3');
const dbRaw = new sqlite3.Database(dbPath);

// Automatically initialize schema on startup if database or tables do not exist
dbRaw.serialize(() => {
  dbRaw.run(`
    CREATE TABLE IF NOT EXISTS user (
      id       INTEGER NOT NULL CONSTRAINT user_pk PRIMARY KEY AUTOINCREMENT,
      name     NVARCHAR(25),
      email    NVARCHAR(25),
      password NVARCHAR(100)
    )
  `);
  dbRaw.run(`
    CREATE TABLE IF NOT EXISTS students (
      id         INTEGER NOT NULL CONSTRAINT students_pk PRIMARY KEY AUTOINCREMENT,
      first_name NVARCHAR(25),
      last_name  NVARCHAR(25),
      email      NVARCHAR(25),
      image      VARCHAR(255)
    )
  `);
  dbRaw.run(`
    CREATE TABLE IF NOT EXISTS evaluation (
      id   INTEGER NOT NULL CONSTRAINT evaluation_pk PRIMARY KEY AUTOINCREMENT,
      name NVARCHAR(25)
    )
  `);
  dbRaw.run(`
    CREATE TABLE IF NOT EXISTS results (
      student_id NVARCHAR(10),
      eval_id    NVARCHAR(25),
      note       INTEGER
    )
  `);
});

export const db = {
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      dbRaw.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      dbRaw.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      dbRaw.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  },
  close: () => {
    return new Promise((resolve, reject) => {
      dbRaw.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
};
export { dbRaw };
