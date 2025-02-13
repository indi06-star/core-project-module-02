import express from 'express';
import { loginHRStaffCon, resetPasswordHRStaffCon } from '../controller/hrController.js';

const router = express.Router();

// Login route for HR Staff
router.post('/login', loginHRStaffCon);

// Password Reset route for HR Staff (PATCH method)
router.patch('/reset-password', resetPasswordHRStaffCon);

export default router;
