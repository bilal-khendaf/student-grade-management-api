import { db } from './db.js';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database with mock data...');
  try {
    // Clear existing records
    await db.run('DELETE FROM user');
    await db.run('DELETE FROM students');
    await db.run('DELETE FROM evaluation');
    await db.run('DELETE FROM results');

    // Seed a default administrator user
    const passwordHash = await bcrypt.hash('password123', 10);
    await db.run(
      'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
      ['Demo Admin', 'admin@example.com', passwordHash]
    );
    console.log('✔ Created user: admin@example.com / password123');

    // Seed mock students
    await db.run("INSERT INTO students (first_name, last_name, email) VALUES ('Alice', 'Smith', 'alice@example.com')");
    await db.run("INSERT INTO students (first_name, last_name, email) VALUES ('Bob', 'Jones', 'bob@example.com')");
    await db.run("INSERT INTO students (first_name, last_name, email) VALUES ('Charlie', 'Brown', 'charlie@example.com')");
    console.log('✔ Seeded 3 mock students');

    // Seed mock evaluations
    await db.run("INSERT INTO evaluation (name) VALUES ('Midterm Exam')");
    await db.run("INSERT INTO evaluation (name) VALUES ('Final Project')");
    console.log('✔ Seeded 2 mock evaluations');

    // Retrieve references to student and evaluation IDs to create results
    const studentRows = await db.all('SELECT id FROM students');
    const evalRows = await db.all('SELECT id FROM evaluation');

    if (studentRows.length >= 2 && evalRows.length >= 2) {
      await db.run('INSERT INTO results (student_id, eval_id, note) VALUES (?, ?, ?)', [studentRows[0].id, evalRows[0].id, 85]);
      await db.run('INSERT INTO results (student_id, eval_id, note) VALUES (?, ?, ?)', [studentRows[0].id, evalRows[1].id, 92]);
      await db.run('INSERT INTO results (student_id, eval_id, note) VALUES (?, ?, ?)', [studentRows[1].id, evalRows[0].id, 78]);
      console.log('✔ Seeded 3 exam results');
    }

    console.log('Database seeding complete!');
  } catch (err) {
    console.error('Failed to seed database:', err);
  } finally {
    await db.close();
  }
}

seed();
