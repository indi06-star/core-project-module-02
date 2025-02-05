import { 
    getPayrollRecords, 
    getSinglePayrollRecord, 
    insertPayrollRecord, 
    deleteSinglePayrollRecord, 
    updatePayrollRecord 
} from "../model/payrollModal.js";

const getPayrollRecordsCon = async (req, res) => {
    try {
        const payrollRecords = await getPayrollRecords();
        res.json({ payroll_records: payrollRecords });
    } catch (error) {
        console.error('Error fetching payroll records:', error);
        res.status(500).json({ message: 'Failed to fetch payroll records' });
    }
}

const getSinglePayrollRecordCon = async (req, res) => {
    try {
        const payrollRecord = await getSinglePayrollRecord(req.params.payroll_id);
        if (!payrollRecord) {
            return res.status(404).json({ message: 'Payroll record not found' });
        }
        res.json({ payroll_record: payrollRecord });
    } catch (error) {
        console.error('Error fetching payroll record:', error);
        res.status(500).json({ message: 'Failed to fetch payroll record' });
    }
}

const postPayrollRecordCon = async (req, res) => {
    const { employee_id, hours_worked, leave_deductions, final_salary } = req.body;
    try {
        if (!employee_id || !hours_worked || !leave_deductions || !final_salary) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newPayrollRecord = await insertPayrollRecord(employee_id, hours_worked, leave_deductions, final_salary);
        res.status(201).json({ payroll_record: newPayrollRecord });
    } catch (error) {
        console.error('Error creating payroll record:', error);
        res.status(500).json({ message: 'Failed to create payroll record' });
    }
}

const deleteSinglePayrollRecordCon = async (req, res) => {
    try {
        const deletedPayrollRecord = await deleteSinglePayrollRecord(req.params.payroll_id);
        if (!deletedPayrollRecord) {
            return res.status(404).json({ message: 'Payroll record not found for deletion' });
        }
        res.json({ message: 'Payroll record deleted successfully' });
    } catch (error) {
        console.error('Error deleting payroll record:', error);
        res.status(500).json({ message: 'Failed to delete payroll record' });
    }
}

const patchPayrollRecordCon = async (req, res) => {
    const { employee_id, hours_worked, leave_deductions, final_salary } = req.body;
    try {
        if (!employee_id || !hours_worked || !leave_deductions || !final_salary) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updatedPayrollRecord = await updatePayrollRecord(employee_id, hours_worked, leave_deductions, final_salary, req.params.payroll_id);
        if (!updatedPayrollRecord) {
            return res.status(404).json({ message: 'Payroll record not found for update' });
        }
        res.json({ payroll_record: updatedPayrollRecord });
    } catch (error) {
        console.error('Error updating payroll record:', error);
        res.status(500).json({ message: 'Failed to update payroll record' });
    }
}

export { 
    getPayrollRecordsCon, 
    getSinglePayrollRecordCon, 
    postPayrollRecordCon, 
    deleteSinglePayrollRecordCon, 
    patchPayrollRecordCon 
};
