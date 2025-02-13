import { pool } from "../config/config.js";
// Get all leave requests from the database
const getLeaveRequests = async () => {
    try {
      const [data] = await pool.query(`
        SELECT leave_requests.*, employees.full_name
        FROM employees
        INNER JOIN leave_requests ON employees.employee_id = leave_requests.employee_id
      `);
      // Format the dates before returning
      return data.map(request => ({
        ...request,
        date: new Date(request.date).toLocaleDateString(), // Format date
      }));
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      throw new Error('Failed to fetch leave requests');
    }
  };
  const getSingleLeaveRequest = async (leave_request_id) => {
    try {
      const [data] = await pool.query(`
        SELECT leave_requests.*, employees.full_name
        FROM leave_requests
        INNER JOIN employees ON leave_requests.employee_id = employees.employee_id
        WHERE leave_requests.leave_request_id = ?
      `, [leave_request_id]);
      return data[0]; // Return the first record as expected
    } catch (error) {
      console.error('Error fetching single leave request:', error);
      throw new Error('Failed to fetch leave request');
    }
  };
const updateLeaveRequestStatus = async (leave_request_id, status) => {
    try {
      await pool.query(
        'UPDATE leave_requests SET status = ? WHERE leave_request_id = ?',
        [status, leave_request_id]
      );
      // Return the updated list of leave requests after updating
      return await getLeaveRequests();
    } catch (error) {
      console.error('Error updating leave request status:', error);
      throw new Error('Failed to update leave request status');
    }
  };
  const insertLeaveRequest = async (employee_id, date, status, reason, action) => {
    try {
      await pool.query(
        'INSERT INTO leave_requests (employee_id, date, status, reason, action) VALUES (?, ?, ?, ?, ?)',
        [employee_id, date, status, reason, action]
      );
      // Return the updated leave request list after insertion
      return await getLeaveRequests();
    } catch (error) {
      console.error('Error inserting leave request:', error);
      throw new Error('Failed to add leave request');
    }
  };
  const deleteSingleLeaveRequest = async (leave_request_id) => {
    try {
      await pool.query('DELETE FROM leave_requests WHERE leave_request_id = ?', [leave_request_id]);
      // Return the updated leave request list after deletion
      return await getLeaveRequests();
    } catch (error) {
      console.error('Error deleting leave request:', error);
      throw new Error('Failed to delete leave request');
    }
  };
export { getLeaveRequests, getSingleLeaveRequest, insertLeaveRequest, deleteSingleLeaveRequest, updateLeaveRequestStatus };