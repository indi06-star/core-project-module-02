import {pool} from "../config/config.js"

// Get all attendance records from the database
const getAttendanceRecords = async () => {
    const [data] = await pool.query('SELECT * FROM attendance');
    return data;
};
  
const getSingleAttendanceRecord = async (attendance_id) => {
    const [data] = await pool.query('SELECT * FROM attendance WHERE id = ?', [attendance_id]);
    return data;
};
  
const insertAttendanceRecord = async (employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29) => {
    await pool.query(
      'INSERT INTO attendance (employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29]
    );
    return await getAttendanceRecords(); // Return the updated attendance list
};
  
const deleteSingleAttendanceRecord = async   (attendance_id) => {
    await pool.query('DELETE FROM attendance WHERE id = ?', [attendance_id]);
    return await getAttendanceRecords(); // Return the updated attendance list
};
  
const updateAttendanceRecord = async (employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29, attendance_id) => {
    await pool.query(
      'UPDATE attendance SET employee_id = ?, employee_name = ?, month_year = ?, day_25 = ?, day_26 = ?, day_27 = ?, day_28 = ?, day_29 = ? WHERE id = ?',
      [employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29, attendance_id]
    );
return await getAttendanceRecords(); // Return the updated attendance list
};

export{getAttendanceRecords, getSingleAttendanceRecord, insertAttendanceRecord,deleteSingleAttendanceRecord,updateAttendanceRecord}
