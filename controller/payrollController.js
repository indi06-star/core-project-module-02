import {
    getPayrollRecords,
    getSinglePayrollRecord,
    insertPayrollRecord,
    deleteSinglePayrollRecord,
    updatePayrollRecord
} from "../model/payrollModal.js";
const getPayrollRecordsCon = async (req, res) => {
    res.json({ payroll_records: await getPayrollRecords() });
  }
const getSinglePayrollRecordCon = async (req, res) => {
    res.json({ payroll_record: await getSinglePayrollRecord(req.params.payroll_id) });
  }
const postPayrollRecordCon = async (req, res) => {
    const { employee_id, hours_worked, leave_deductions, final_salary } = req.body;
    res.json({ payroll_records: await insertPayrollRecord(employee_id, hours_worked, leave_deductions, final_salary) });
  }
const deleteSinglePayrollRecordCon = async (req, res) => {
    res.json({ payroll_record: await deleteSinglePayrollRecord(req.params.payroll_id) });
  }
const patchPayrollRecordCon = async (req, res) => {
    const { employee_id, hours_worked, leave_deductions, final_salary } = req.body;
    res.json({ payroll_records: await updatePayrollRecord(employee_id, hours_worked, leave_deductions, final_salary, req.params.payroll_id) });
  }
export {
    getPayrollRecordsCon,
    getSinglePayrollRecordCon,
    postPayrollRecordCon,
    deleteSinglePayrollRecordCon,
    patchPayrollRecordCon
};