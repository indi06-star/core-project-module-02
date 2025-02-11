import express from 'express';
import {getAttendanceRecordsCon,getSingleAttendanceRecordCon,postAttendanceRecordCon,deleteSingleAttendanceRecordCon,patchAttendanceRecordCon} from '../controller/attendanceController.js';

const router = express.Router();

router.get('/', getAttendanceRecordsCon);
router.get('/:attendance_id', getSingleAttendanceRecordCon);
router.post('/', postAttendanceRecordCon);
router.delete('/:attendance_id', deleteSingleAttendanceRecordCon);
router.patch('/:attendance_id', patchAttendanceRecordCon);

export default router
