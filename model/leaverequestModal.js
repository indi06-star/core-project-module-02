import {pool} from "../config/config.js"

const getLeaveRequests = async () => {
    const [data] = await pool.query('SELECT * FROM leave_requests');
    return data;
  };
  
  const getSingleLeaveRequest = async (leave_request_id) => {
    const [data] = await pool.query('SELECT * FROM leave_requests WHERE leave_request_id = ?', [leave_request_id]);
    return data;
  };
  
  const insertLeaveRequest = async (employee_id, date, status, reason, action) => {
    await pool.query(
      'INSERT INTO leave_requests (employee_id, date, status, reason, action) VALUES (?, ?, ?, ?, ?)',
      [employee_id, date, status, reason, action]
    );
    return await getLeaveRequests(); // Return the updated leave request list
  };
  
  const deleteSingleLeaveRequest = async (leave_request_id) => {
    await pool.query('DELETE FROM leave_requests WHERE leave_request_id = ?', [leave_request_id]);
    return await getLeaveRequests(); // Return the updated leave request list
  };
  
  const updateLeaveRequest = async (employee_id, date, status, reason, action, leave_request_id) => {
    await pool.query(
      'UPDATE leave_requests SET employee_id = ?, date = ?, status = ?, reason = ?, action = ? WHERE leave_request_id = ?',
      [employee_id, date, status, reason, action, leave_request_id]
    );
    return await getLeaveRequests(); // Return the updated leave request list
  };

export {getLeaveRequests, getSingleLeaveRequest, insertLeaveRequest, deleteSingleLeaveRequest, updateLeaveRequest}