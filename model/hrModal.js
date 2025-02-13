import { pool } from '../config/config.js';

// Login HR Staff by full name and password (plain text password comparison)
export const loginHRStaff = async (full_name, password) => {
    try {
        // Query the database to fetch HR staff details
        const [hrStaff] = await pool.query(
            'SELECT * FROM hr_staff WHERE full_name = ? AND password = ?',
            [full_name, password]  // Directly compare the plain text password
        );

        // If no HR staff is found or password doesn't match
        if (!hrStaff || hrStaff.length === 0) {
            return null;
        }

        return hrStaff[0];  // Return the matched HR staff
    } catch (error) {
        console.error('Error in loginHRStaff:', error);
        throw error;
    }
};

// Reset Password for HR Staff (plain text password)
export const resetPasswordHRStaff = async (full_name, newPassword) => {
    try {
        // Query the database to find HR staff by their full name
        const [hrStaff] = await pool.query(
            'SELECT * FROM hr_staff WHERE full_name = ?',
            [full_name]
        );

        // If no HR staff is found, return null
        if (!hrStaff || hrStaff.length === 0) {
            return null;
        }

        // Update the HR staff password in the database with the plain text password
        await pool.query(
            'UPDATE hr_staff SET password = ? WHERE full_name = ?',
            [newPassword, full_name]  // Directly set the new plain text password
        );

        return hrStaff[0];  // Return the updated HR staff details
    } catch (error) {
        console.error('Error in resetPasswordHRStaff:', error);
        throw error;
    }
};
