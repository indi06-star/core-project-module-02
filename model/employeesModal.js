
import { pool } from "../config/config.js";
const getEmployees = async () => {
    try {
        const [data] = await pool.query(`
          SELECT employees.*, departments.department_name
          FROM employees
          INNER JOIN departments ON employees.department_id = departments.department_id
        `);
        return data;
    } catch (error) {
        console.error("Database error:", error);
        throw error; // Rethrow so the controller can catch it
    }
};
const getSingleEmployee = async (employee_id) => {
    const [data] = await pool.query(`
      SELECT employees.*, departments.department_name
      FROM employees
      INNER JOIN departments ON employees.department_id = departments.department_id
      WHERE employees.employee_id = ?
    `, [employee_id]);
    return data;
  };
// Insert a new employee
const insertEmployee = async (full_name, position, contact, history, review, department_id) => {
    const [result] = await pool.query(
      'INSERT INTO employees (full_name, position, contact, history, review, department_id) VALUES (?, ?, ?, ?, ?, ?)',
      [full_name, position, contact, history, review, department_id]
    );
    // Return the newly inserted employee or all employees (if needed)
    const [newEmployee] = await pool.query('SELECT * FROM employees WHERE employee_id = ?', [result.insertId]);
    return newEmployee; // Return the newly added employee
  };
  // Delete an employee by ID
  const deleteSingleEmployee = async (employee_id) => {
    await pool.query('DELETE FROM employees WHERE employee_id = ?', [employee_id]);
  };
// Update employee information
const updateEmployee = async (full_name, position, contact, history, review, department_id, employee_id) => {
    await pool.query(
      'UPDATE employees SET full_name = ?, position = ?, contact = ?, history = ?, review = ?, department_id = ? WHERE employee_id = ?',
      [full_name, position, contact, history, review, department_id, employee_id]
    );
    // Return the updated employee list (or just the updated employee if necessary)
    const [updatedEmployee] = await pool.query('SELECT * FROM employees WHERE employee_id = ?', [employee_id]);
    return updatedEmployee;
  };
export { getEmployees, getSingleEmployee, insertEmployee, deleteSingleEmployee, updateEmployee };