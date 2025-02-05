import {pool} from "../config/config.js"

const getEmployees = async () => {
    const [data] = await pool.query('SELECT * FROM employees');
    return data;
};
  
const getSingleEmployee = async (employee_id) => {
    const [data] = await pool.query('SELECT * FROM employees WHERE employee_id = ?', [employee_id]);
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

export {getEmployees, getSingleEmployee, insertEmployee, deleteSingleEmployee, updateEmployee}