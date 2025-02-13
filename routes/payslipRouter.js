import { generatePayslipCon } from '../controller/payrollController.js';

// Add this route to handle payslip generation
router.get('/:payroll_id', generatePayslipCon);
