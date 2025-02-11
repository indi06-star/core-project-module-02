import { pool } from '../config/config.js'; // MySQL connection pool

// Get all attendance records from the database
 const getAttendanceRecords = async () => {
  try {
    const [data] = await pool.query('SELECT * FROM attendance;');
    return data;
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    throw new Error('Error fetching attendance records');
  }
}
 const getSingleAttendanceRecord = async (attendance_id) => {
  try {
    const [data] = await pool.query('SELECT * FROM attendance WHERE attendance_id = ?', [attendance_id]);
    return data;
  } catch (error) {
    console.error(`Error fetching attendance record with ID ${attendance_id}:`, error);
    throw new Error(`Error fetching attendance record with ID ${attendance_id}`);
  }
}
 const insertAttendanceRecord = async (employee_id, employee_name, month_year, attendance) => {
  try {
    const days = Object.keys(attendance).map(day => `${day} = ?`);
    const values = Object.values(attendance);

    const query = `INSERT INTO attendance (employee_id, employee_name, month_year, ${days.join(', ')}) 
                   VALUES (?, ?, ?, ${values.map(() => '?').join(', ')})`;

    await pool.query(query, [employee_id, employee_name, month_year, ...values]);
    return await getAttendanceRecords(); // Return the updated attendance list
  } catch (error) {
    console.error('Error inserting attendance record:', error);
    throw new Error('Error inserting attendance record');
  }
}
 const updateAttendanceRecord = async (updatedFields, attendance_id) => {
  try {
    const updates = Object.keys(updatedFields)
      .map(field => `${field} = ?`)
      .join(', ');

    const values = Object.values(updatedFields);
    const query = `UPDATE attendance SET ${updates} WHERE attendance_id = ?`;

    const [result] = await pool.query(query, [...values, attendance_id]);

    // Check if any rows were updated
    if (result.affectedRows === 0) {
      throw new Error("Attendance record not found.");
    }

    return await getAttendanceRecords(); // Return the updated attendance list
  } catch (error) {
    console.error('Error updating attendance record:', error);
    throw new Error('Error updating attendance record');
  }
}
 const deleteSingleAttendanceRecord = async (attendance_id) => {
  try {
    await pool.query('DELETE FROM attendance WHERE attendance_id = ?', [attendance_id]);
    return await getAttendanceRecords(); // Return the updated attendance list
  } catch (error) {
    console.error(`Error deleting attendance record with ID ${attendance_id}:`, error);
    throw new Error(`Error deleting attendance record with ID ${attendance_id}`);
  }
};
export{getAttendanceRecords,getSingleAttendanceRecord,insertAttendanceRecord,updateAttendanceRecord,deleteSingleAttendanceRecord} ;