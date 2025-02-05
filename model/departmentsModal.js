import { pool } from "../config/config.js";

// Get all departments from the database
const getDepartments = async () => {
    try {
        const [data] = await pool.query('SELECT * FROM departments');
        return data;
    } catch (error) {
        console.error("Error getting departments:", error);
        throw new Error("Error fetching departments");
    }
};
  
const getSingleDepartment = async (department_id) => {
    try {
        const [data] = await pool.query('SELECT * FROM departments WHERE department_id = ?', [department_id]);
        return data;
    } catch (error) {
        console.error(`Error getting department with ID ${department_id}:`, error);
        throw new Error(`Error fetching department with ID ${department_id}`);
    }
};
  
const insertDepartment = async (department_name) => {
    try {
        await pool.query(
            'INSERT INTO departments (department_name) VALUES (?)',
            [department_name]
        );
        return await getDepartments(); // Return the updated department list
    } catch (error) {
        console.error("Error inserting department:", error);
        throw new Error("Error inserting department");
    }
};
  
const deleteSingleDepartment = async (department_id) => {
    try {
        await pool.query('DELETE FROM departments WHERE department_id = ?', [department_id]);
        return await getDepartments(); // Return the updated department list
    } catch (error) {
        console.error(`Error deleting department with ID ${department_id}:`, error);
        throw new Error(`Error deleting department with ID ${department_id}`);
    }
};
  
const updateDepartment = async (department_name, department_id) => {
    try {
        await pool.query(
            'UPDATE departments SET department_name = ? WHERE department_id = ?',
            [department_name, department_id]
        );
        return await getDepartments(); // Return the updated department list
    } catch (error) {
        console.error(`Error updating department with ID ${department_id}:`, error);
        throw new Error(`Error updating department with ID ${department_id}`);
    }
};

export { getDepartments, getSingleDepartment, insertDepartment, deleteSingleDepartment, updateDepartment };
