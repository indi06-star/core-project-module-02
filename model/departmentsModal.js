import {pool} from "../config/config.js"

const getDepartments = async () => {
    const [data] = await pool.query('SELECT * FROM departments');
    return data;
  };
  
const getSingleDepartment = async (department_id) => {
    const [data] = await pool.query('SELECT * FROM departments WHERE department_id = ?', [department_id]);
    return data;
};
  
const insertDepartment = async (department_name) => {
    await pool.query(
      'INSERT INTO departments (department_name) VALUES (?)',
      [department_name]
    );
    return await getDepartments(); // Return the updated department list
};
  
const deleteSingleDepartment = async (department_id) => {
    await pool.query('DELETE FROM departments WHERE department_id = ?', [department_id]);
    return await getDepartments(); // Return the updated department list
};
  
const updateDepartment = async (department_name, department_id) => {
    await pool.query(
      'UPDATE departments SET department_name = ? WHERE department_id = ?',
      [department_name, department_id]
    );
    return await getDepartments(); // Return the updated department list
};

export {getDepartments, getSingleDepartment, insertDepartment, deleteSingleDepartment, updateDepartment}