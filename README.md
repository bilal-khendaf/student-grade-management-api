# Grade & Student Management REST API

A modern, production-grade Node.js RESTful API designed to manage students, evaluations, and grades with secure JWT authentication and comprehensive OpenAPI documentation.

This project has been modernized to follow professional, production-ready standards.

## Key Features

- **Standard ES Modules (ESM):** Built using standard modern JavaScript `import` / `export` syntax.
- **Node.js Native Features:** 
  - Natively loads environment configurations (using `--env-file`) eliminating third-party configuration packages.
  - Native hot-reloading file watch capability (`--watch`).
  - Zero-dependency testing with the built-in test runner (`node:test`).
- **RESTful Endpoints:** Fully structured endpoints for student, evaluation, and grade operations.
- **JWT-Based Authentication:** Secured endpoints requiring JSON Web Tokens for user authorization.
- **Input Validation:** Robust input validation and sanitization using `express-validator`.
- **Database Self-Initialization:** Integrates with SQLite3 and automatically initializes schemas and database tables on startup.
- **Comprehensive API Docs:** Fully interactive API playground powered by Swagger UI and OpenAPI documentation.

## Tech Stack

- **Runtime:** Node.js (v22+)
- **Framework:** Express 5.x
- **Database:** SQLite3
- **Authentication:** jsonwebtoken & bcryptjs
- **API Documentation:** Swagger UI & swagger-jsdoc
- **Testing:** Node.js Native Test Runner (`node:test` and `node:assert`)
- **Linting:** ESLint (Flat Config Standard)

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```
Ensure your `TOKEN_KEY` is set in the `.env` file.

### 3. Seed the Database
Run the seeding command to automatically initialize tables and populate mock data (adds a demo admin, mock students, exams, and grades):
```bash
npm run seed
```
*Demo credentials populated: `admin@example.com` / `password123`*

### 4. Running the Application
To run the server locally in development mode (with native hot-reloading):
```bash
npm run dev
```
The API will be available at [http://localhost:3000](http://localhost:3000).

### 5. Running the Tests
All integration tests run against an isolated in-memory SQLite database configuration:
```bash
npm run test
```

### 6. Code Quality & Formatting
Run ESLint flat config check:
```bash
npm run lint
```

## API Documentation

Interactive Swagger documentation is available. Start the development server and navigate to:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)
