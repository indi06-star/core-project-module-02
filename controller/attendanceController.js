import {
    getAttendanceRecords, 
    getSingleAttendanceRecord, 
    insertAttendanceRecord, 
    deleteSingleAttendanceRecord, 
    updateAttendanceRecord
} from "../model/attendaceModal.js";

const getAttendanceRecordsCon = async (req, res) => {
    try {
        const attendanceRecords = await getAttendanceRecords();
        res.json({ attendance_records: attendanceRecords });
    } catch (error) {
        console.error("Error fetching attendance records:", error);
        res.status(500).json({ message: "Failed to fetch attendance records" });
    }
};

const getSingleAttendanceRecordCon = async (req, res) => {
    try {
        const attendanceRecord = await getSingleAttendanceRecord(req.params.attendance_id);
        if (!attendanceRecord) {
            return res.status(404).json({ message: "Attendance record not found" });
        }
        res.json({ attendance_record: attendanceRecord });
    } catch (error) {
        console.error("Error fetching single attendance record:", error);
        res.status(500).json({ message: "Failed to fetch attendance record" });
    }
};

const postAttendanceRecordCon = async (req, res) => {
    const { employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29 } = req.body;
    try {
        if (!employee_id || !employee_name || !month_year) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newAttendanceRecord = await insertAttendanceRecord(employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29);
        res.status(201).json({ attendance_record: newAttendanceRecord });
    } catch (error) {
        console.error("Error inserting attendance record:", error);
        res.status(500).json({ message: "Failed to create attendance record" });
    }
};

const deleteSingleAttendanceRecordCon = async (req, res) => {
    try {
        const deletedRecord = await deleteSingleAttendanceRecord(req.params.attendance_id);
        if (!deletedRecord) {
            return res.status(404).json({ message: "Attendance record not found for deletion" });
        }
        res.json({ message: "Attendance record deleted successfully" });
    } catch (error) {
        console.error("Error deleting attendance record:", error);
        res.status(500).json({ message: "Failed to delete attendance record" });
    }
};

const patchAttendanceRecordCon = async (req, res) => {
    const { employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29 } = req.body;
    try {
        if (!employee_id || !employee_name || !month_year) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const updatedRecord = await updateAttendanceRecord(employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29, req.params.attendance_id);
        if (!updatedRecord) {
            return res.status(404).json({ message: "Attendance record not found for update" });
        }
        res.json({ attendance_record: updatedRecord });
    } catch (error) {
        console.error("Error updating attendance record:", error);
        res.status(500).json({ message: "Failed to update attendance record" });
    }
};

export {
    getAttendanceRecordsCon, 
    getSingleAttendanceRecordCon, 
    postAttendanceRecordCon, 
    deleteSingleAttendanceRecordCon, 
    patchAttendanceRecordCon
};
