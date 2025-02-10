import { pool } from "../config/config.js";

const getPayrollRecords = async () => {
  const [data] = await pool.query(`
    SELECT payroll.*, employees.full_name, 
           (payroll.final_salary * 0.15) AS tax_deduction, 
           (payroll.final_salary - (payroll.final_salary * 0.15)) AS net_salary
    FROM employees
    INNER JOIN payroll ON employees.employee_id = payroll.employee_id
  `);
  return data;
};

const getSinglePayrollRecord = async (payroll_id) => {
  const [data] = await pool.query(`
    SELECT payroll.*, employees.full_name, 
           (payroll.final_salary * 0.15) AS tax_deduction, 
           (payroll.final_salary - (payroll.final_salary * 0.15)) AS net_salary
    FROM payroll
    INNER JOIN employees ON payroll.employee_id = employees.employee_id
    WHERE payroll.payroll_id = ?
  `, [payroll_id]);
  return data.length > 0 ? data[0] : null;
};

const insertPayrollRecord = async (employee_id, hours_worked, leave_deductions, tax_deductions, final_salary) => {
  await pool.query(
    'INSERT INTO payroll (employee_id, hours_worked, leave_deductions, tax_deductions, insurance_deductions, pension_deductions, final_salary) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [employee_id, hours_worked, leave_deductions, tax_deductions, insurance_deductions, pension_deductions, final_salary]
  );
  return await getPayrollRecords();
};

const deleteSinglePayrollRecord = async (payroll_id) => {
  await pool.query("DELETE FROM payroll WHERE payroll_id = ?", [payroll_id]);
  return await getPayrollRecords();
};

const updatePayrollRecord = async (employee_id, hours_worked, leave_deductions, tax_deductions, insurance_deductions, pension_deductions, final_salary, payroll_id) => {
  await pool.query(
    'UPDATE payroll SET employee_id = ?, hours_worked = ?, leave_deductions = ?, tax_deductions = ?, insurance_deductions = ?, pension_deductions = ?, final_salary = ? WHERE payroll_id = ?',
    [employee_id, hours_worked, leave_deductions, tax_deductions, insurance_deductions, pension_deductions, final_salary, payroll_id]
  );
  return await getPayrollRecords();
};

export { getPayrollRecords, getSinglePayrollRecord, insertPayrollRecord, deleteSinglePayrollRecord, updatePayrollRecord };
