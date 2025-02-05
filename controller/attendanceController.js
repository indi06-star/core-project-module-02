import {getAttendanceRecords, getSingleAttendanceRecord, insertAttendanceRecord, deleteSingleAttendanceRecord, updateAttendanceRecord} from "../model/attendaceModal.js"


const getAttendanceRecordsCon = async (req, res) => {
    res.json({ attendance_records: await getAttendanceRecords() });
}

const getSingleAttendanceRecordCon = async (req, res) => {
    res.json({ attendance_record: await getSingleAttendanceRecord(req.params.attendance_id) });
}

const postAttendanceRecordCon = async (req, res) => {
    const { employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29 } = req.body;
    res.json({ attendance_records: await insertAttendanceRecord(employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29) });
}

const deleteSingleAttendanceRecordCon = async (req, res) => {
    res.json({ attendance_record: await deleteSingleAttendanceRecord(req.params.attendance_id) });
}

const patchAttendanceRecordCon = async (req, res) => {
    const { employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29 } = req.body;
    res.json({ attendance_records: await updateAttendanceRecord(employee_id, employee_name, month_year, day_25, day_26, day_27, day_28, day_29, req.params.attendance_id) });
}

export {getAttendanceRecordsCon, getSingleAttendanceRecordCon, postAttendanceRecordCon, deleteSingleAttendanceRecordCon, patchAttendanceRecordCon}