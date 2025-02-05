import express from 'express';
import { getHRStaffCon, getSingleHRStaffCon, postHRStaffCon, deleteSingleHRStaffCon, patchHRStaffCon } from '../controller/hrStaffController.js';

const router = express.Router();


router.get('/', getHRStaffCon);
router.get('/:hr_id', getSingleHRStaffCon);
router.post('/', postHRStaffCon);
router.delete('/:hr_id', deleteSingleHRStaffCon);
router.patch('/:hr_id', patchHRStaffCon);

export default router;
