import {pool} from "../config/config.js"
// Get all HR staff from the database
const getHRStaff = async () => {
    const [data] = await pool.query('SELECT * FROM hr_staff');
    return data;
  };  
const getSingleHRStaff = async (hr_id) => {
    const [data] = await pool.query('SELECT * FROM hr_staff WHERE hr_id = ?', [hr_id]);
    return data;
};


export {getHRStaff, getSingleHRStaff}