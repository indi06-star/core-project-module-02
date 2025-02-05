import mysql from 'mysql2/promise';
import express from 'express';
import { config } from 'dotenv';
config();

const pool = mysql.createPool({
  hostname: process.env.HOSTNAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
const app = express();
app.use(express.json());

// Start the server on port 4000
app.listen(4000, () => {
  console.log('Server is running at http://localhost:4000');
  console.log('Hi...');
});

//-------------------------------------------HR STAFF---------------------------------------------------------------
// Route to get all HR staff
app.get('/hr-staff', async (req, res) => {
  res.json({ hr_staff: await getHRStaff() });
});

// Route to get a single HR staff by ID
app.get('/hr-staff/:hr_id', async (req, res) => {
  res.json({ hr_staff: await getSingleHRStaff(req.params.hr_id) });
});

// Get all HR staff from the database
const getHRStaff = async () => {
  const [data] = await pool.query('SELECT * FROM hr_staff');
  return data;
};

const getSingleHRStaff = async (hr_id) => {
  const [data] = await pool.query('SELECT * FROM hr_staff WHERE hr_id = ?', [hr_id]);
  return data;
};

//-------------------------------------------------------------EMPLOYEES----------------------------------------------------------------------
// Route to get all employees
app.get('/employees', async (req, res) => {
  res.json({ employees: await getEmployees() });
});

// Route to get a single employee by ID
app.get('/employees/:employee_id', async (req, res) => {
  res.json({ employee: await getSingleEmployee(req.params.employee_id) });
});

// Route to add a new employee
app.post('/employees', async (req, res) => {
  const { full_name, position, contact, history, review, hr_id } = req.body;
  res.json({ employees: await insertEmployee(full_name, position, contact, history, review, hr_id) });
});

// Route to delete an employee by ID
app.delete('/employees/:employee_id', async (req, res) => {
  res.json({ employee: await deleteSingleEmployee(req.params.employee_id) });
});

// Route to update an employee's information
app.patch('/employees/:employee_id', async (req, res) => {
  const { full_name, position, contact, history, review, hr_id } = req.body;
  res.json({ employees: await updateEmployee(full_name, position, contact, history, review, hr_id, req.params.employee_id) });
});

// Get all employees from the database
// const getEmployees = async () => {
//   const [data] = await pool.query('SELECT * FROM employees');
//   return data;
// };

//Get all employees (inner join with dep table, to get dep_name)
const getEmployees = async () => {
  const [data] = await pool.query(`
    SELECT employees.*, departments.department_name 
    FROM employees
    INNER JOIN departments ON employees.department_id = departments.department_id
  `);
  return data;
};

//Get single employee(inner join)
const getSingleEmployee = async (employee_id) => {
  const [data] = await pool.query(`
    SELECT employees.*, departments.department_name 
    FROM employees
    INNER JOIN departments ON employees.department_id = departments.department_id
    WHERE employees.employee_id = ?
  `, [employee_id]);
  return data;
};

const insertEmployee = async (full_name, position, contact, history, review, hr_id) => {
  await pool.query(
    'INSERT INTO employees (full_name, position, contact, history, review, hr_id) VALUES (?, ?, ?, ?, ?, ?)',
    [full_name, position, contact, history, review, hr_id]
  );
  return await getEmployees(); // Return the updated employee list
};

const deleteSingleEmployee = async (employee_id) => {
  await pool.query('DELETE FROM employees WHERE employee_id = ?', [employee_id]);
  return await getEmployees(); // Return the updated employee list
};

const updateEmployee = async (full_name, position, contact, history, review, hr_id, employee_id) => {
  await pool.query(
    'UPDATE employees SET full_name = ?, position = ?, contact = ?, history = ?, review = ?, hr_id = ? WHERE employee_id = ?',
    [full_name, position, contact, history, review, hr_id, employee_id]
  );
  return await getEmployees(); // Return the updated employee list
};

//----------------------------------------------------------- LEAVE REQUESTS---------------------------------------------------------------
// Route to get all leave requests
app.get('/leave-requests', async (req, res) => {
  res.json({ leave_requests: await getLeaveRequests() });
});

// Route to get a single leave request by ID
app.get('/leave-requests/:leave_request_id', async (req, res) => {
  res.json({ leave_request: await getSingleLeaveRequest(req.params.leave_request_id) });
});

// Route to add a new leave request
app.post('/leave-requests', async (req, res) => {
  const { employee_id, date, status, reason, action } = req.body;
  res.json({ leave_requests: await insertLeaveRequest(employee_id, date, status, reason, action) });
});

// Route to delete a leave request by ID
app.delete('/leave-requests/:leave_request_id', async (req, res) => {
  res.json({ leave_request: await deleteSingleLeaveRequest(req.params.leave_request_id) });
});

// Route to update a leave request's information
app.patch('/leave-requests/:leave_request_id', async (req, res) => {
  const { employee_id, date, status, reason, action } = req.body;
  res.json({ leave_requests: await updateLeaveRequest(employee_id, date, status, reason, action, req.params.leave_request_id) });
});

// Get all leave requests from the database
const getLeaveRequests = async () => {
  const [data] = await pool.query('SELECT * FROM leave_requests');
  return data;
};

const getSingleLeaveRequest = async (leave_request_id) => {
  const [data] = await pool.query('SELECT * FROM leave_requests WHERE leave_request_id = ?', [leave_request_id]);
  return data;
};

const insertLeaveRequest = async (employee_id, date, status, reason, action) => {
  await pool.query(
    'INSERT INTO leave_requests (employee_id, date, status, reason, action) VALUES (?, ?, ?, ?, ?)',
    [employee_id, date, status, reason, action]
  );
  return await getLeaveRequests(); // Return the updated leave request list
};

const deleteSingleLeaveRequest = async (leave_request_id) => {
  await pool.query('DELETE FROM leave_requests WHERE leave_request_id = ?', [leave_request_id]);
  return await getLeaveRequests(); // Return the updated leave request list
};

const updateLeaveRequest = async (employee_id, date, status, reason, action, leave_request_id) => {
  await pool.query(
    'UPDATE leave_requests SET employee_id = ?, date = ?, status = ?, reason = ?, action = ? WHERE leave_request_id = ?',
    [employee_id, date, status, reason, action, leave_request_id]
  );
  return await getLeaveRequests(); // Return the updated leave request list
};

//-------------------------------------------------------------- ATTENDANCE---------------------------------------------------------------------
// Route to get all attendance records
app.get('/attendance-records', async (req, res) => {
  res.json({ attendance_records: await getAttendanceRecords() });
});

// Route to get a single attendance record by ID
app.get('/attendance-records/:attendance_id', async (req, res) => {
  res.json({ attendance_record: await getSingleAttendanceRecord(req.params.attendance_id) });
});

// Route to add a new attendance record
app.post('/attendance-records', async (req, res) => {
  const { employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29 } = req.body;
  res.json({ attendance_records: await insertAttendanceRecord(employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29) });
});

// Route to delete an attendance record by ID
app.delete('/attendance-records/:attendance_id', async (req, res) => {
  res.json({ attendance_record: await deleteSingleAttendanceRecord(req.params.attendance_id) });
});

// Route to update an attendance record's information
app.patch('/attendance-records/:attendance_id', async (req, res) => {
  const { employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29 } = req.body;
  res.json({ attendance_records: await updateAttendanceRecord(employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29, req.params.attendance_id) });
});

// Get all attendance records from the database
const getAttendanceRecords = async () => {
  const [data] = await pool.query('SELECT * FROM attendance');
  return data;
};

const getSingleAttendanceRecord = async (attendance_id) => {
  const [data] = await pool.query('SELECT * FROM attendance WHERE id = ?', [attendance_id]);
  return data;
};

const insertAttendanceRecord = async (employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29) => {
  await pool.query(
    'INSERT INTO attendance (employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29]
  );
  return await getAttendanceRecords(); // Return the updated attendance list
};

const deleteSingleAttendanceRecord = async (attendance_id) => {
  await pool.query('DELETE FROM attendance WHERE id = ?', [attendance_id]);
  return await getAttendanceRecords(); // Return the updated attendance list
};

const updateAttendanceRecord = async (employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29, attendance_id) => {
  await pool.query(
    'UPDATE attendance SET employee_id = ?, employee_name = ?, month_year = ?, day_25 = ?, day_26 = ?, day_27 = ?, day_28 = ?, day_29 = ? WHERE id = ?',
    [employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29, attendance_id]
  );
  return await getAttendanceRecords(); // Return the updated attendance list
};

//--------------------------------------------------------- PAYROLL-----------------------------------------------------------------------------
// Route to get all payroll records
app.get('/payroll-records', async (req, res) => {
  res.json({ payroll_records: await getPayrollRecords() });
});

// Route to get a single payroll record by ID
app.get('/payroll-records/:payroll_id', async (req, res) => {
  res.json({ payroll_record: await getSinglePayrollRecord(req.params.payroll_id) });
});

// Route to add a new payroll record
app.post('/payroll-records', async (req, res) => {
  const { employee_id, hours_worked, leave_deductions, final_salary } = req.body;
  res.json({ payroll_records: await insertPayrollRecord(employee_id, hours_worked, leave_deductions, final_salary) });
});

// Route to delete a payroll record by ID
app.delete('/payroll-records/:payroll_id', async (req, res) => {
  res.json({ payroll_record: await deleteSinglePayrollRecord(req.params.payroll_id) });
});

// Route to update a payroll record's information
app.patch('/payroll-records/:payroll_id', async (req, res) => {
  const { employee_id, hours_worked, leave_deductions, final_salary } = req.body;
  res.json({ payroll_records: await updatePayrollRecord(employee_id, hours_worked, leave_deductions, final_salary, req.params.payroll_id) });
});

// Get all payroll records from the database
const getPayrollRecords = async () => {
  const [data] = await pool.query('SELECT * FROM payroll');
  return data;
};

const getSinglePayrollRecord = async (payroll_id) => {
  const [data] = await pool.query('SELECT * FROM payroll WHERE payroll_id = ?', [payroll_id]);
  return data;
};

const insertPayrollRecord = async (employee_id, hours_worked, leave_deductions, final_salary) => {
  await pool.query(
    'INSERT INTO payroll (employee_id, hours_worked, leave_deductions, final_salary) VALUES (?, ?, ?, ?)',
    [employee_id, hours_worked, leave_deductions, final_salary]
  );
  return await getPayrollRecords(); // Return the updated payroll list
};

const deleteSinglePayrollRecord = async (payroll_id) => {
  await pool.query('DELETE FROM payroll WHERE payroll_id = ?', [payroll_id]);
  return await getPayrollRecords(); // Return the updated payroll list
};

const updatePayrollRecord = async (employee_id, hours_worked, leave_deductions, final_salary, payroll_id) => {
  await pool.query(
    'UPDATE payroll SET employee_id = ?, hours_worked = ?, leave_deductions = ?, final_salary = ? WHERE payroll_id = ?',
    [employee_id, hours_worked, leave_deductions, final_salary, payroll_id]
  );
  return await getPayrollRecords(); // Return the updated payroll list
};
