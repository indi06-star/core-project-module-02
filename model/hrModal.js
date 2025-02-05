import express from 'express';
import { pool } from "../config/config.js";

// HR STAFF ROUTES

// Route to get all HR staff
app.get('/hr-staff', async (req, res) => {
  try {
    res.json({ hr_staff: await getHRStaff() });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving HR staff' });
  }
});

// Route to get a single HR staff by ID
app.get('/hr-staff/:hr_id', async (req, res) => {
  try {
    res.json({ hr_staff: await getSingleHRStaff(req.params.hr_id) });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving HR staff' });
  }
});

// Route to add a new HR staff
app.post('/hr-staff', async (req, res) => {
  const { full_name, position, department_id, contact, salary, history, image_path } = req.body;
  try {
    res.json({ hr_staff: await insertHRStaff(full_name, position, department_id, contact, salary, history, image_path) });
  } catch (error) {
    res.status(500).json({ error: 'Error adding HR staff' });
  }
});

// Route to delete an HR staff by ID
app.delete('/hr-staff/:hr_id', async (req, res) => {
  try {
    res.json({ hr_staff: await deleteSingleHRStaff(req.params.hr_id) });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting HR staff' });
  }
});

// Route to update an HR staff's information
app.patch('/hr-staff/:hr_id', async (req, res) => {
  const { full_name, position, department_id, contact, salary, history, image_path } = req.body;
  try {
    res.json({ hr_staff: await updateHRStaff(full_name, position, department_id, contact, salary, history, image_path, req.params.hr_id) });
  } catch (error) {
    res.status(500).json({ error: 'Error updating HR staff' });
  }
});

// Database Functions

// Get all HR staff from the database
const getHRStaff = async () => {
  try {
    const [data] = await pool.query('SELECT * FROM hr_staff');
    return data;
  } catch (error) {
    throw new Error('Error retrieving HR staff');
  }
};

// Get a single HR staff by ID
const getSingleHRStaff = async (hr_id) => {
  try {
    const [data] = await pool.query('SELECT * FROM hr_staff WHERE hr_id = ?', [hr_id]);
    return data;
  } catch (error) {
    throw new Error('Error retrieving HR staff');
  }
};

// Insert a new HR staff record into the database
const insertHRStaff = async (full_name, position, department_id, contact, salary, history, image_path) => {
  try {
    await pool.query(
      'INSERT INTO hr_staff (full_name, position, department_id, contact, salary, history, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [full_name, position, department_id, contact, salary, history, image_path]
    );
    return await getHRStaff(); // Return the updated HR staff list
  } catch (error) {
    throw new Error('Error inserting HR staff');
  }
};

// Delete an HR staff record by ID
const deleteSingleHRStaff = async (hr_id) => {
  try {
    await pool.query('DELETE FROM hr_staff WHERE hr_id = ?', [hr_id]);
    return await getHRStaff(); // Return the updated HR staff list
  } catch (error) {
    throw new Error('Error deleting HR staff');
  }
};

// Update an HR staff record by ID
const updateHRStaff = async (full_name, position, department_id, contact, salary, history, image_path, hr_id) => {
  try {
    await pool.query(
      'UPDATE hr_staff SET full_name = ?, position = ?, department_id = ?, contact = ?, salary = ?, history = ?, image_path = ? WHERE hr_id = ?',
      [full_name, position, department_id, contact, salary, history, image_path, hr_id]
    );
    return await getHRStaff(); // Return the updated HR staff list
  } catch (error) {
    throw new Error('Error updating HR staff');
  }
};

export { getHRStaff, getSingleHRStaff, insertHRStaff, deleteSingleHRStaff, updateHRStaff };
