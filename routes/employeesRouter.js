import express from 'express';
import { getEmployeesCon, getSingleEmployeeCon, postEmployeeCon, deleteSingleEmployeeCon, patchEmployeeCon } from '../controller/employeesController.js';

const router = express.Router();

router.get('/', getEmployeesCon);
router.get('/:employee_id', getSingleEmployeeCon);
router.post('/', postEmployeeCon);
router.delete('/:employee_id', deleteSingleEmployeeCon);
router.patch('/:employee_id', patchEmployeeCon);

export default router;
