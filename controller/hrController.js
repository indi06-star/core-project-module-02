import { loginHRStaff, resetPasswordHRStaff } from '../model/hrModal.js'; // Import the necessary methods

// Login Handler
const loginHRStaffCon = async (req, res) => {
    const { employeeName, password } = req.body;

    try {
        // Check if the employee exists and password matches
        const hrStaff = await loginHRStaff(employeeName, password);

        if (!hrStaff) {
            return res.status(404).json({ success: false, message: 'Invalid credentials' });
        }

        // Return success response if login is valid
        res.json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Error logging in' });
    }
};

// Password Reset Handler (PATCH request)
const resetPasswordHRStaffCon = async (req, res) => {
    const { employeeName, newPassword } = req.body;

    try {
        // Check if the employee exists
        const hrStaff = await resetPasswordHRStaff(employeeName, newPassword);

        if (!hrStaff) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        // If employee is found, return success message
        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, message: 'Error resetting password' });
    }
};

export { loginHRStaffCon, resetPasswordHRStaffCon };  // Export both functions
