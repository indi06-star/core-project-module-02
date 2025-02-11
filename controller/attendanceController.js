import { getAttendanceRecords, insertAttendanceRecord, updateAttendanceRecord, deleteSingleAttendanceRecord } from '../model/attendaceModal.js';

// Route to get all attendance records
const getAttendanceRecordsCon = async (req, res) => {
  try {
    const attendanceRecords = await getAttendanceRecords(); // Fetch attendance records from the model
    res.json({ attendance_records: attendanceRecords });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ error: 'Error fetching attendance records' });
  }
};
const getSingleAttendanceRecordCon = async (req, res) => {
  const { attendance_id } = req.params;
  try {
    const attendanceRecord = await getSingleAttendanceRecord(attendance_id); // Get record from model
    if (!attendanceRecord) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json(attendanceRecord);
  } catch (error) {
    console.error(`Error fetching attendance record with ID ${attendance_id}:`, error);
    res.status(500).json({ error: 'Error fetching attendance record' });
  }
};

// Route to add a new attendance record
const postAttendanceRecordCon = async (req, res) => {
  const { employee_id, employee_name, month_year, attendance } = req.body;

  if (!employee_id || !employee_name || !month_year || !attendance) {
    return res.status(400).json({ error: 'Employee ID, Name, Month/Year, and Attendance are required' });
  }

  try {
    const newRecord = await insertAttendanceRecord(employee_id, employee_name, month_year, attendance); // Insert into model
    res.status(201).json({ message: 'Attendance record added successfully', attendance_record: newRecord });
  } catch (error) {
    console.error('Error adding attendance record:', error);
    res.status(500).json({ error: 'Error adding attendance record' });
  }
};

 const patchAttendanceRecordCon = async (req, res) => {
  const { attendance_id } = req.params;
  const updatedFields = req.body;

  if (!updatedFields || Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ error: "No fields provided for update." });
  }

  try {
    const updatedRecord = await updateAttendanceRecord(updatedFields, attendance_id); // Update in model
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json({ message: 'Attendance record updated successfully', attendance_record: updatedRecord });
  } catch (error) {
    console.error('Error updating attendance record:', error);
    res.status(500).json({ error: 'Error updating attendance record' });
  }
};

// Route to delete an attendance record by ID
 const deleteSingleAttendanceRecordCon = async (req, res) => {
  const { attendance_id } = req.params;
  try {
    const deletedRecord = await deleteSingleAttendanceRecord(attendance_id); // Delete from model
    res.json({ message: 'Attendance record deleted successfully', attendance_record: deletedRecord });
  } catch (error) {
    console.error(`Error deleting attendance record with ID ${attendance_id}:`, error);
    res.status(500).json({ error: 'Error deleting attendance record' });
  }
};
export{getAttendanceRecordsCon,getSingleAttendanceRecordCon,postAttendanceRecordCon,patchAttendanceRecordCon, deleteSingleAttendanceRecordCon}
