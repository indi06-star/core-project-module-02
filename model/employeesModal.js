import { pool } from "../config/config.js";

// Get all employees from the database
const getEmployees = async () => {
    try {
        const [data] = await pool.query('SELECT * FROM employees');
        return data;
    } catch (error) {
        console.error("Error getting employees:", error);
        throw new Error("Error fetching employees");
    }
};
  
const getSingleEmployee = async (employee_id) => {
    try {
        const [data] = await pool.query('SELECT * FROM employees WHERE employee_id = ?', [employee_id]);
        return data;
    } catch (error) {
        console.error(`Error getting employee with ID ${employee_id}:`, error);
        throw new Error(`Error fetching employee with ID ${employee_id}`);
    }
};
  
const insertEmployee = async (full_name, position, contact, history, review, department_id) => {
    try {
        await pool.query(
            'INSERT INTO employees (full_name, position, contact, history, review, department_id) VALUES (?, ?, ?, ?, ?, ?)',
            [full_name, position, contact, history, review, department_id]
        );
        return await getEmployees(); // Return the updated employee list
    } catch (error) {
        console.error("Error inserting employee:", error);
        throw new Error("Error inserting employee");
    }
};
  
const deleteSingleEmployee = async (employee_id) => {
    try {
        await pool.query('DELETE FROM employees WHERE employee_id = ?', [employee_id]);
        return await getEmployees(); // Return the updated employee list
    } catch (error) {
        console.error(`Error deleting employee with ID ${employee_id}:`, error);
        throw new Error(`Error deleting employee with ID ${employee_id}`);
    }
};
  
const updateEmployee = async (full_name, position, contact, history, review, department_id, employee_id) => {
    try {
        await pool.query(
            'UPDATE employees SET full_name = ?, position = ?, contact = ?, history = ?, review = ?, department_id = ? WHERE employee_id = ?',
            [full_name, position, contact, history, review, department_id, employee_id]
        );
        return await getEmployees(); // Return the updated employee list
    } catch (error) {
        console.error(`Error updating employee with ID ${employee_id}:`, error);
        throw new Error(`Error updating employee with ID ${employee_id}`);
    }
};

export { getEmployees, getSingleEmployee, insertEmployee, deleteSingleEmployee, updateEmployee };
