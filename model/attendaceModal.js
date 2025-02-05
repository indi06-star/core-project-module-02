import { pool } from "../config/config.js";

// Get all attendance records from the database
const getAttendanceRecords = async () => {
    try {
        const [data] = await pool.query('SELECT * FROM attendance');
        return data;
    } catch (error) {
        console.error("Error getting attendance records:", error);
        throw new Error("Error fetching attendance records");
    }
};
  
const getSingleAttendanceRecord = async (attendance_id) => {
    try {
        const [data] = await pool.query('SELECT * FROM attendance WHERE id = ?', [attendance_id]);
        return data;
    } catch (error) {
        console.error(`Error getting attendance record with ID ${attendance_id}:`, error);
        throw new Error(`Error fetching attendance record with ID ${attendance_id}`);
    }
};
  
const insertAttendanceRecord = async (employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29) => {
    try {
        await pool.query(
            'INSERT INTO attendance (employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29]
        );
        return await getAttendanceRecords(); // Return the updated attendance list
    } catch (error) {
        console.error("Error inserting attendance record:", error);
        throw new Error("Error inserting attendance record");
    }
};
  
const deleteSingleAttendanceRecord = async (attendance_id) => {
    try {
        await pool.query('DELETE FROM attendance WHERE id = ?', [attendance_id]);
        return await getAttendanceRecords(); // Return the updated attendance list
    } catch (error) {
        console.error(`Error deleting attendance record with ID ${attendance_id}:`, error);
        throw new Error(`Error deleting attendance record with ID ${attendance_id}`);
    }
};
  
const updateAttendanceRecord = async (employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29, attendance_id) => {
    try {
        await pool.query(
            'UPDATE attendance SET employee_id = ?, employee_name = ?, month_year = ?, day_25 = ?, day_26 = ?, day_27 = ?, day_28 = ?, day_29 = ? WHERE id = ?',
            [employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29, attendance_id]
        );
        return await getAttendanceRecords(); // Return the updated attendance list
    } catch (error) {
        console.error(`Error updating attendance record with ID ${attendance_id}:`, error);
        throw new Error(`Error updating attendance record with ID ${attendance_id}`);
    }
};

export { getAttendanceRecords, getSingleAttendanceRecord, insertAttendanceRecord, deleteSingleAttendanceRecord, updateAttendanceRecord };
