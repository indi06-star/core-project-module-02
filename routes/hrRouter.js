import express from 'express';
import { 
  loginHRStaffCon, 
  resetPasswordHRStaffCon, 
  changePasswordHRStaffCon,    
  getHRStaffCon, 
  getSingleHRStaffCon, 
  postHRStaffCon, 
  patchHRStaffCon, 
  deleteHRStaffCon 
} from '../controller/hrController.js';

const router = express.Router();

// Auth Routes
router.post('/login', loginHRStaffCon);
router.post('/reset-password', resetPasswordHRStaffCon);
router.patch('/change-password', changePasswordHRStaffCon);

// HR Staff CRUD Routes
router.get('/hr-staff', getHRStaffCon);
router.get('/hr-staff/:hr_id', getSingleHRStaffCon);
router.post('/hr-staff', postHRStaffCon);
router.patch('/hr-staff/:hr_id', patchHRStaffCon);
router.delete('/hr-staff/:hr_id', deleteHRStaffCon);

export default router;
