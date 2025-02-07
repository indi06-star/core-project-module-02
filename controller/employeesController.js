import {
    getEmployees, 
    getSingleEmployee, 
    insertEmployee, 
    deleteSingleEmployee, 
    updateEmployee
} from "../model/employeesModal.js";

// Get all employees
const getEmployeesCon = async (req, res) => {
    try {
        const employees = await getEmployees();
        res.status(200).json({ employees });
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error: error.message });
    }
};

// Get a single employee
const getSingleEmployeeCon = async (req, res) => {
    try {
        const employee = await getSingleEmployee(req.params.employee_id);
        if (!employee.length) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ employee });
    } catch (error) {
        res.status(500).json({ message: "Error fetching employee", error: error.message });
    }
};

// Add a new employee
const postEmployeeCon = async (req, res) => {
    try {
        const { full_name, position, contact, history, review, department_id } = req.body;
        if (!full_name || !position || !contact || !department_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const employees = await insertEmployee(full_name, position, contact, history, review, department_id);
        const newEmployee = employees[employees.length - 1]; // Get the last added employee
        res.status(201).json(newEmployee);
        
    } catch (error) {
        res.status(500).json({ message: "Error inserting employee", error: error.message });
    }
};

// Delete an employee
const deleteSingleEmployeeCon = async (req, res) => {
    try {
        const employees = await deleteSingleEmployee(req.params.employee_id);
        res.status(200).json({ message: "Employee deleted successfully", employees });
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee", error: error.message });
    }
};

// Update an employee
const patchEmployeeCon = async (req, res) => {
    try {
        const { full_name, position, contact, history, review, department_id } = req.body;
        if (!full_name || !position || !contact || !department_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const employees = await updateEmployee(full_name, position, contact, history, review, department_id, req.params.employee_id);
        res.status(200).json({ message: "Employee updated successfully", employees });
    } catch (error) {
        res.status(500).json({ message: "Error updating employee", error: error.message });
    }
};

export { getEmployeesCon, getSingleEmployeeCon, postEmployeeCon, deleteSingleEmployeeCon, patchEmployeeCon };
