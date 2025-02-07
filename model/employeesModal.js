import { pool } from "../config/config.js";

// Get all employees from the database
const getEmployees = async () => {
    const [data] = await pool.query('SELECT * FROM employees');
    return data;
};

const getSingleEmployee = async (employee_id) => {
    const [data] = await pool.query('SELECT * FROM employees WHERE employee_id = ?', [employee_id]);
    return data;
};

const postEmployeeCon = async (req, res) => {
    try {
        const { full_name, position, contact, history, review, department_id } = req.body;
        if (!full_name || !position || !contact || !department_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newEmployee = await insertEmployee(full_name, position, contact, history, review, department_id);
        res.status(201).json(newEmployee); // Return only the new employee
    } catch (error) {
        res.status(500).json({ message: "Error inserting employee", error: error.message });
    }
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

export { getEmployees, getSingleEmployee, insertEmployee, deleteSingleEmployee, updateEmployee };
