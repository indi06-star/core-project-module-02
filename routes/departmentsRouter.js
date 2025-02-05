import express from 'express';
import { getDepartmentsCon, getSingleDepartmentCon, postDepartmentCon, deleteSingleDepartmentCon, patchDepartmentCon } from '../controller/departmentController.js';

const router = express.Router();
router.get('/', getDepartmentsCon);
router.get('/:department_id', getSingleDepartmentCon);
router.post('/', postDepartmentCon);
router.delete('/:department_id', deleteSingleDepartmentCon);
router.patch('/:department_id', patchDepartmentCon);

export default router;

