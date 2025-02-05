import {
    getLeaveRequests,
    getSingleLeaveRequest,
    insertLeaveRequest,
    deleteSingleLeaveRequest,
    updateLeaveRequest
} from "../model/leaverequestModal.js";

const getLeaveRequestsCon = async (req, res) => {
    try {
        const leaveRequests = await getLeaveRequests();
        res.json({ leave_requests: leaveRequests });
    } catch (error) {
        console.error("Error fetching leave requests:", error);
        res.status(500).json({ message: "Failed to fetch leave requests" });
    }
};
const getSingleLeaveRequestCon = async (req, res) => {
    try {
        const leaveRequest = await getSingleLeaveRequest(req.params.leave_request_id);
        if (!leaveRequest) {
            return res.status(404).json({ message: "Leave request not found" });
        }
        res.json({ leave_request: leaveRequest });
    } catch (error) {
        console.error("Error fetching leave request:", error);
        res.status(500).json({ message: "Failed to fetch leave request" });
    }
};

const postLeaveRequestCon = async (req, res) => {
    const { employee_id, date, status, reason, action } = req.body;
    try {
        if (!employee_id || !date || !status || !reason || !action) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newLeaveRequest = await insertLeaveRequest(employee_id, date, status, reason, action);
        res.status(201).json({ leave_request: newLeaveRequest });
    } catch (error) {
        console.error("Error creating leave request:", error);
        res.status(500).json({ message: "Failed to create leave request" });
    }
};

const deleteSingleLeaveRequestCon = async (req, res) => {
    try {
        const deletedLeaveRequest = await deleteSingleLeaveRequest(req.params.leave_request_id);
        if (!deletedLeaveRequest) {
            return res.status(404).json({ message: "Leave request not found for deletion" });
        }
        res.json({ message: "Leave request deleted successfully" });
    } catch (error) {
        console.error("Error deleting leave request:", error);
        res.status(500).json({ message: "Failed to delete leave request" });
    }
};

const patchLeaveRequestCon = async (req, res) => {
    const { employee_id, date, status, reason, action } = req.body;
    try {
        if (!employee_id || !date || !status || !reason || !action) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const updatedLeaveRequest = await updateLeaveRequest(employee_id, date, status, reason, action, req.params.leave_request_id);
        if (!updatedLeaveRequest) {
            return res.status(404).json({ message: "Leave request not found for update" });
        }
        res.json({ leave_request: updatedLeaveRequest });
    } catch (error) {
        console.error("Error updating leave request:", error);
        res.status(500).json({ message: "Failed to update leave request" });
    }
};

export {
    getLeaveRequestsCon,
    getSingleLeaveRequestCon,
    postLeaveRequestCon,
    deleteSingleLeaveRequestCon,
    patchLeaveRequestCon
};
