import { pool } from "../config/config.js";
const getPayrollRecords = async () => {
  const [data] = await pool.query(`
    SELECT payroll.*, employees.full_name
    FROM employees
    INNER JOIN payroll ON employees.employee_id = payroll.employee_id
  `);
  return data;
};
const getSinglePayrollRecord = async (payroll_id) => {
  const [data] = await pool.query(`
    SELECT payroll.*, employees.full_name
    FROM payroll
    INNER JOIN employees ON payroll.employee_id = employees.employee_id
    WHERE payroll.payroll_id = ?
  `, [payroll_id]);
  return data[0]; // Return the first record since we expect only one
};
const insertPayrollRecord = async (employee_id, hours_worked, leave_deductions, final_salary) => {
  await pool.query(
    'INSERT INTO payroll (employee_id, hours_worked, leave_deductions, final_salary) VALUES (?, ?, ?, ?)',
    [employee_id, hours_worked, leave_deductions, final_salary]
  );
  return await getPayrollRecords(); // Return the updated payroll list
};
const deleteSinglePayrollRecord = async (payroll_id) => {
  await pool.query('DELETE FROM payroll WHERE payroll_id = ?', [payroll_id]);
  return await getPayrollRecords(); // Return the updated payroll list
};
const updatePayrollRecord = async (employee_id, hours_worked, leave_deductions, final_salary, payroll_id) => {
  await pool.query(
    'UPDATE payroll SET employee_id = ?, hours_worked = ?, leave_deductions = ?, final_salary = ? WHERE payroll_id = ?',
    [employee_id, hours_worked, leave_deductions, final_salary, payroll_id]
  );
  return await getPayrollRecords(); // Return the updated payroll list
};
export { getPayrollRecords, getSinglePayrollRecord, insertPayrollRecord, deleteSinglePayrollRecord, updatePayrollRecord };






