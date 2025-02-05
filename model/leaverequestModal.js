import { pool } from "../config/config.js";

// Get all leave requests from the database
const getLeaveRequests = async () => {
    try {
        const [data] = await pool.query('SELECT * FROM leave_requests');
        return data;
    } catch (error) {
        console.error("Error getting leave requests:", error);
        throw new Error("Error fetching leave requests");
    }
};
  
const getSingleLeaveRequest = async (leave_request_id) => {
    try {
        const [data] = await pool.query('SELECT * FROM leave_requests WHERE leave_request_id = ?', [leave_request_id]);
        return data;
    } catch (error) {
        console.error(`Error getting leave request with ID ${leave_request_id}:`, error);
        throw new Error(`Error fetching leave request with ID ${leave_request_id}`);
    }
};
  
const insertLeaveRequest = async (employee_id, date, status, reason, action) => {
    try {
        await pool.query(
            'INSERT INTO leave_requests (employee_id, date, status, reason, action) VALUES (?, ?, ?, ?, ?)',
            [employee_id, date, status, reason, action]
        );
        return await getLeaveRequests(); // Return the updated leave request list
    } catch (error) {
        console.error("Error inserting leave request:", error);
        throw new Error("Error inserting leave request");
    }
};
  
const deleteSingleLeaveRequest = async (leave_request_id) => {
    try {
        await pool.query('DELETE FROM leave_requests WHERE leave_request_id = ?', [leave_request_id]);
        return await getLeaveRequests(); // Return the updated leave request list
    } catch (error) {
        console.error(`Error deleting leave request with ID ${leave_request_id}:`, error);
        throw new Error(`Error deleting leave request with ID ${leave_request_id}`);
    }
};
  
const updateLeaveRequest = async (employee_id, date, status, reason, action, leave_request_id) => {
    try {
        await pool.query(
            'UPDATE leave_requests SET employee_id = ?, date = ?, status = ?, reason = ?, action = ? WHERE leave_request_id = ?',
            [employee_id, date, status, reason, action, leave_request_id]
        );
        return await getLeaveRequests(); // Return the updated leave request list
    } catch (error) {
        console.error(`Error updating leave request with ID ${leave_request_id}:`, error);
        throw new Error(`Error updating leave request with ID ${leave_request_id}`);
    }
};

export { getLeaveRequests, getSingleLeaveRequest, insertLeaveRequest, deleteSingleLeaveRequest, updateLeaveRequest };
