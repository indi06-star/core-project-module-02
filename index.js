import mysql from 'mysql2/promise';
import express from 'express';
import cors from 'cors'; // Ensure cross-origin resource sharing is allowed
import { config } from 'dotenv';
import attendanceRouter from './routes/attendanceRouter.js';
import employeesRouter from './routes/employeesRouter.js';
import leaverequestRouter from './routes/leaverequestRouter.js';
import payrollRouter from './routes/payrollRouter.js';
import hrRouter from './routes/hrRouter.js'; // New HR login route
config();

const app = express();

// Use CORS for enabling cross-origin requests
app.use(cors());

// Middleware to parse incoming requests as JSON
app.use(express.json());

// Register the route handlers for attendance, employees, leave requests, payroll
app.use('/attendance', attendanceRouter);
app.use('/employees', employeesRouter);
app.use('/leaverequests', leaverequestRouter);
app.use('/payroll', payrollRouter);
app.use('/api/hr', hrRouter);


// HR login route (new)
app.use('/hr', hrRouter); // Route for handling HR login requests

// Start the server on port 4000
app.listen(4000, () => {
  console.log('Server is running at http://localhost:4000');
  console.log('Hi...');
});

