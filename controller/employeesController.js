import {
    getEmployees, 
    getSingleEmployee, 
    insertEmployee, 
    deleteSingleEmployee, 
    updateEmployee
} from "../model/employeesModal.js";

const getEmployeesCon = async (req, res) => {
    try {
        const employees = await getEmployees();
        res.json({ employees });
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Failed to fetch employees" });
    }
};

const getSingleEmployeeCon = async (req, res) => {
    try {
        const employee = await getSingleEmployee(req.params.employee_id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json({ employee });
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ message: "Failed to fetch employee" });
    }
};

const postEmployeeCon = async (req, res) => {
    const { full_name, position, contact, history, review, department_id } = req.body;
    try {
        if (!full_name || !position || !contact || !department_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newEmployee = await insertEmployee(full_name, position, contact, history, review, department_id);
        res.status(201).json({ employee: newEmployee });
    } catch (error) {
        console.error("Error inserting employee:", error);
        res.status(500).json({ message: "Failed to create employee" });
    }
};

const deleteSingleEmployeeCon = async (req, res) => {
    try {
        const deletedEmployee = await deleteSingleEmployee(req.params.employee_id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found for deletion" });
        }
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ message: "Failed to delete employee" });
    }
};

const patchEmployeeCon = async (req, res) => {
    const { full_name, position, contact, history, review, department_id } = req.body;
    try {
        if (!full_name || !position || !contact || !department_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const updatedEmployee = await updateEmployee(full_name, position, contact, history, review, department_id, req.params.employee_id);
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found for update" });
        }
        res.json({ employee: updatedEmployee });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Failed to update employee" });
    }
};

export {
    getEmployeesCon, 
    getSingleEmployeeCon, 
    postEmployeeCon, 
    deleteSingleEmployeeCon, 
    patchEmployeeCon
};
