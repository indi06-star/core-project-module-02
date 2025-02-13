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
      res.json({ employees });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve employees', error: error.message });
    }
  };
// Get a single employee
const getSingleEmployeeCon = async (req, res) => {
    try {
      const employee = await getSingleEmployee(req.params.employee_id);
      if (employee.length === 0) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json({ employee });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve employee', error: error.message });
    }
  }
// Add a new employee
const postEmployeeCon = async (req, res) => {
    const { full_name, position, contact, department_id, history = '', review = '' } = req.body;
    // Validate input
    if (!full_name || !position || !contact || !department_id) {
      return res.status(400).json({ message: 'Missing required fields: full_name, position, contact, or department_id' });
    }
    try {
      // Insert the new employee into the database
      await insertEmployee(full_name, position, contact, history, review, department_id);
      res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add employee', error: error.message });
    }
  };
// Delete an employee
const deleteSingleEmployeeCon = async (req, res) => {
    try {
      await deleteSingleEmployee(req.params.employee_id);
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete employee', error: error.message });
    }
  };
// Update an employee
const patchEmployeeCon = async (req, res) => {
    const { full_name, position, contact, history, review, department_id } = req.body;
    // Validate input
    if (!full_name || !position || !contact || !department_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
      await updateEmployee(full_name, position, contact, history, review, department_id, req.params.employee_id);
      res.json({ message: 'Employee updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update employee', error: error.message });
    }
  };
export { getEmployeesCon, getSingleEmployeeCon, postEmployeeCon, deleteSingleEmployeeCon, patchEmployeeCon };