import { describe, it, before, beforeEach, after } from 'node:test';
import assert from 'node:assert';
import app from '../app.js';
import { db } from '../database/db.js';

let server;
let baseUrl;

before(() => {
  return new Promise((resolve) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      resolve();
    });
  });
});

after(() => {
  return new Promise((resolve) => {
    server.close(resolve);
  });
});

beforeEach(async () => {
  await db.run('DELETE FROM user');
  await db.run('DELETE FROM students');
  await db.run('DELETE FROM evaluation');
  await db.run('DELETE FROM results');
});

describe('User Authentication API', () => {
  it('should register a new user successfully', async () => {
    const res = await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securepassword123'
      })
    });
    
    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.message, 'User created successfully');
  });

  it('should not register user with duplicate email', async () => {
    await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securepassword123'
      })
    });

    const res = await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'john@example.com',
        password: 'otherpassword456'
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 400);
    assert.strictEqual(data.message, 'User already exists');
  });

  it('should log in an existing user and return a JWT token', async () => {
    await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securepassword123'
      })
    });

    const res = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'john@example.com',
        password: 'securepassword123'
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.message, 'User successfully logged in');
    assert.ok(data.token);
  });
});

describe('Student Operations API', () => {
  const getAuthToken = async () => {
    await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Tester',
        email: 'tester@example.com',
        password: 'testerpassword'
      })
    });

    const res = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'tester@example.com',
        password: 'testerpassword'
      })
    });

    const data = await res.json();
    return data.token;
  };

  it('should require authentication to add a student', async () => {
    const res = await fetch(`${baseUrl}/addStudent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: 'Alice',
        last_name: 'Smith',
        email: 'alice@example.com'
      })
    });

    assert.strictEqual(res.status, 403);
  });

  it('should add a student successfully when authenticated', async () => {
    const token = await getAuthToken();
    const res = await fetch(`${baseUrl}/addStudent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        first_name: 'Alice',
        last_name: 'Smith',
        email: 'alice@example.com'
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.message, 'Student created successfully');

    const student = await db.get('SELECT * FROM students WHERE email = ?', ['alice@example.com']);
    assert.ok(student);
    assert.strictEqual(student.first_name, 'Alice');
  });

  it('should edit an existing student', async () => {
    const token = await getAuthToken();
    
    await db.run("INSERT INTO students (first_name, last_name, email) VALUES ('Bob', 'Johnson', 'bob@example.com')");
    const student = await db.get('SELECT id FROM students WHERE email = ?', ['bob@example.com']);

    const res = await fetch(`${baseUrl}/editStudent/${student.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        first_name: 'Robert',
        last_name: 'Johnson',
        email: 'robert@example.com'
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.message, 'Student updated successfully');

    const updated = await db.get('SELECT * FROM students WHERE id = ?', [student.id]);
    assert.strictEqual(updated.first_name, 'Robert');
    assert.strictEqual(updated.email, 'robert@example.com');
  });

  it('should delete a student', async () => {
    const token = await getAuthToken();
    
    await db.run("INSERT INTO students (first_name, last_name, email) VALUES ('Charlie', 'Brown', 'charlie@example.com')");
    const student = await db.get('SELECT id FROM students WHERE email = ?', ['charlie@example.com']);

    const res = await fetch(`${baseUrl}/delStudent/${student.id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': token
      }
    });

    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.message, 'Student deleted successfully');

    const deleted = await db.get('SELECT * FROM students WHERE id = ?', [student.id]);
    assert.strictEqual(deleted, undefined);
  });
});

describe('Evaluation Operations API', () => {
  const getAuthToken = async () => {
    await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Tester',
        email: 'tester@example.com',
        password: 'testerpassword'
      })
    });

    const res = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'tester@example.com',
        password: 'testerpassword'
      })
    });

    const data = await res.json();
    return data.token;
  };

  it('should create an evaluation', async () => {
    const token = await getAuthToken();
    const res = await fetch(`${baseUrl}/addEvaluation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        name: 'Midterm Exam'
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.message, 'Evaluation created successfully');

    const evalRow = await db.get('SELECT * FROM evaluation WHERE name = ?', ['Midterm Exam']);
    assert.ok(evalRow);
  });

  it('should edit an evaluation', async () => {
    const token = await getAuthToken();
    await db.run("INSERT INTO evaluation (name) VALUES ('Quiz 1')");
    const evalRow = await db.get('SELECT id FROM evaluation WHERE name = ?', ['Quiz 1']);

    const res = await fetch(`${baseUrl}/editEvaluation/${evalRow.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        name: 'Quiz One'
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.message, 'Evaluation updated successfully');

    const updated = await db.get('SELECT * FROM evaluation WHERE id = ?', [evalRow.id]);
    assert.strictEqual(updated.name, 'Quiz One');
  });
});
