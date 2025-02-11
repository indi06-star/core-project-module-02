import mysql from 'mysql2/promise';
import express from 'express';
import cors from 'cors' //changes
import { config } from 'dotenv';
import attendanceRouter from './routes/attendanceRouter.js'
config();


const app = express();

//Indi changes
app.use(cors())
app.use(express.json());
//middleware
app.use('/',attendanceRouter)



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

// Route to add a new HR staff
app.post('/hr-staff', async (req, res) => {
  const { full_name, position, department_id, contact, salary, history, image_path } = req.body;
  res.json({ hr_staff: await insertHRStaff(full_name, position, department_id, contact, salary, history, image_path) });
});

// Route to delete an HR staff by ID
app.delete('/hr-staff/:hr_id', async (req, res) => {
  res.json({ hr_staff: await deleteSingleHRStaff(req.params.hr_id) });
});

// Route to update an HR staff's information
app.patch('/hr-staff/:hr_id', async (req, res) => {
  const { full_name, position, department_id, contact, salary, history, image_path } = req.body;
  res.json({ hr_staff: await updateHRStaff(full_name, position, department_id, contact, salary, history, image_path, req.params.hr_id) });
});

// Get all HR staff from the database
const getHRStaff = async () => {
  const [data] = await pool.query('SELECT * FROM hr_staff');
  return data;
};

// Get a single HR staff by ID
const getSingleHRStaff = async (hr_id) => {
  const [data] = await pool.query('SELECT * FROM hr_staff WHERE hr_id = ?', [hr_id]);
  return data;
};

// Insert a new HR staff record into the database
const insertHRStaff = async (full_name, position, department_id, contact, salary, history, image_path) => {
  await pool.query(
    'INSERT INTO hr_staff (full_name, position, department_id, contact, salary, history, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [full_name, position, department_id, contact, salary, history, image_path]
  );
  return await getHRStaff(); // Return the updated HR staff list
};

// Delete an HR staff record by ID
const deleteSingleHRStaff = async (hr_id) => {
  await pool.query('DELETE FROM hr_staff WHERE hr_id = ?', [hr_id]);
  return await getHRStaff(); // Return the updated HR staff list
};

// Update an HR staff record by ID
const updateHRStaff = async (full_name, position, department_id, contact, salary, history, image_path, hr_id) => {
  await pool.query(
    'UPDATE hr_staff SET full_name = ?, position = ?, department_id = ?, contact = ?, salary = ?, history = ?, image_path = ? WHERE hr_id = ?',
    [full_name, position, department_id, contact, salary, history, image_path, hr_id]
  );
  return await getHRStaff(); // Return the updated HR staff list
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
  const { full_name, position, contact, history, review, department_id } = req.body;
  res.json({ employees: await insertEmployee(full_name, position, contact, history, review, department_id) });
});

// Route to delete an employee by ID
app.delete('/employees/:employee_id', async (req, res) => {
  res.json({ employee: await deleteSingleEmployee(req.params.employee_id) });
});

// Route to update an employee's information
app.patch('/employees/:employee_id', async (req, res) => {
  const { full_name, position, contact, history, review, department_id } = req.body;
  res.json({ employees: await updateEmployee(full_name, position, contact, history, review, department_id, req.params.employee_id) });
});

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

const insertEmployee = async (full_name, position, contact, history, review, department_id) => {
  await pool.query(
    'INSERT INTO employees (full_name, position, contact, history, review, department_id) VALUES (?, ?, ?, ?, ?, ?)',
    [full_name, position, contact, history, review, department_id]
  );
  return await getEmployees(); // Return the updated employee list
};

const deleteSingleEmployee = async (employee_id) => {
  await pool.query('DELETE FROM employees WHERE employee_id = ?', [employee_id]);
  return await getEmployees(); // Return the updated employee list
};

const updateEmployee = async (full_name, position, contact, history, review, department_id, employee_id) => {
  await pool.query(
    'UPDATE employees SET full_name = ?, position = ?, contact = ?, history = ?, review = ?, department_id = ? WHERE employee_id = ?',
    [full_name, position, contact, history, review, department_id, employee_id]
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
//---------------------------------------------------------------DEPARTMENT------------------------------------------------------------------------
// Department Routes
// Route to get all departments
app.get('/departments', async (req, res) => {
  res.json({ departments: await getDepartments() });
});

// Route to get a single department by ID
app.get('/departments/:department_id', async (req, res) => {
  res.json({ department: await getSingleDepartment(req.params.department_id) });
});

// Route to add a new department
app.post('/departments', async (req, res) => {
  const { department_name } = req.body;
  res.json({ departments: await insertDepartment(department_name) });
});

// Route to delete a department by ID
app.delete('/departments/:department_id', async (req, res) => {
  res.json({ department: await deleteSingleDepartment(req.params.department_id) });
});

// Route to update a department's information
app.patch('/departments/:department_id', async (req, res) => {
  const { department_name } = req.body;
  res.json({ departments: await updateDepartment(department_name, req.params.department_id) });
});

// Get all departments from the database
const getDepartments = async () => {
  const [data] = await pool.query('SELECT * FROM departments');
  return data;
};

// Get a single department by ID
const getSingleDepartment = async (department_id) => {
  const [data] = await pool.query('SELECT * FROM departments WHERE department_id = ?', [department_id]);
  return data;
};

// Insert a new department into the database
const insertDepartment = async (department_name) => {
  await pool.query(
    'INSERT INTO departments (department_name) VALUES (?)',
    [department_name]
  );
  return await getDepartments(); // Return the updated department list
};

// Delete a department by ID
const deleteSingleDepartment = async (department_id) => {
  await pool.query('DELETE FROM departments WHERE department_id = ?', [department_id]);
  return await getDepartments(); // Return the updated department list
};

// Update a department by ID
const updateDepartment = async (department_name, department_id) => {
  await pool.query(
    'UPDATE departments SET department_name = ? WHERE department_id = ?',
    [department_name, department_id]
  );
  return await getDepartments(); // Return the updated department list
};
