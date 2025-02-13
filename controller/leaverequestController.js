import {
    getLeaveRequests,
    getSingleLeaveRequest,
    insertLeaveRequest,
    deleteSingleLeaveRequest,
    updateLeaveRequestStatus
} from "../model/leaverequestModal.js";
const getLeaveRequestsCon = async (req, res) => {
    try {
      const leaveRequests = await getLeaveRequests();
      res.json({ leave_requests: leaveRequests });
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch leave requests' });
    }
  }
const getSingleLeaveRequestCon = async (req, res) => {
    try {
      const leaveRequest = await getSingleLeaveRequest(req.params.leave_request_id);
      if (!leaveRequest) {
        return res.status(404).send({ error: 'Leave request not found' });
      }
      res.json({ leave_request: leaveRequest });
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch leave request' });
    }
  }
const postLeaveRequestCon = async (req, res) => {
    const { employee_id, date, status, reason, action } = req.body;
    try {
      const updatedLeaveRequests = await insertLeaveRequest(employee_id, date, status, reason, action);
      res.json({ leave_requests: updatedLeaveRequests });
    } catch (error) {
      res.status(500).send({ error: 'Failed to add leave request' });
    }
  }
const deleteSingleLeaveRequestCon = async (req, res) => {
    try {
      const updatedLeaveRequests = await deleteSingleLeaveRequest(req.params.leave_request_id);
      res.json({ leave_requests: updatedLeaveRequests });
    } catch (error) {
      res.status(500).send({ error: 'Failed to delete leave request' });
    }
  }
const patchLeaveRequestCon = async (req, res) => {
    const leaveRequestId = req.params.id;
    const { status } = req.body;
    try {
      if (!status) {
        return res.status(400).send({ error: 'Missing required field: status' });
      }
      const updatedLeaveRequests = await updateLeaveRequestStatus(leaveRequestId, status);
      res.json({ leave_requests: updatedLeaveRequests });
    } catch (error) {
      res.status(500).send({ error: 'Failed to update leave request' });
    }
  }
export {
    getLeaveRequestsCon,
    getSingleLeaveRequestCon,
    postLeaveRequestCon,
    deleteSingleLeaveRequestCon,
    patchLeaveRequestCon
};