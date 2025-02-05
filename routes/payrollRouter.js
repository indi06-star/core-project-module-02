import express from 'express';
import { getPayrollRecordsCon, getSinglePayrollRecordCon, postPayrollRecordCon, deleteSinglePayrollRecordCon, patchPayrollRecordCon} from '../controller/payrollController.js';

const router = express.Router();

router.get('/', getPayrollRecordsCon);
router.get('/:payroll_id', getSinglePayrollRecordCon);
router.post('/', postPayrollRecordCon);
router.delete('/:payroll_id', deleteSinglePayrollRecordCon);
router.patch('/:payroll_id', patchPayrollRecordCon);
export default router;
