import express from 'express';
import {getLeaveRequestsCon,getSingleLeaveRequestCon,postLeaveRequestCon,deleteSingleLeaveRequestCon,patchLeaveRequestCon} from '../controller/leaverequestController.js';

const router = express.Router();

router.get('/', getLeaveRequestsCon);
router.get('/:leave_request_id', getSingleLeaveRequestCon);
router.post('/', postLeaveRequestCon);
router.delete('/:leave_request_id', deleteSingleLeaveRequestCon);
router.patch('/:leave_request_id', patchLeaveRequestCon);

export default router;
