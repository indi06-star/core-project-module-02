import { 
    getHRStaff, 
    getSingleHRStaff, 
    insertHRStaff, 
    deleteSingleHRStaff, 
    updateHRStaff 
} from "../model/hrModal.js";
  
const getHRStaffCon = async (req, res) => {
      try {
          const hrStaff = await getHRStaff();
          res.json({ hr_staff: hrStaff });
      } catch (error) {
          console.error('Error fetching HR staff:', error);
          res.status(500).json({ message: 'Failed to fetch HR staff' });
      }
}
  
const getSingleHRStaffCon =  async (req, res) => {
      try {
          const hrStaff = await getSingleHRStaff(req.params.hr_id);
          if (!hrStaff) {
              return res.status(404).json({ message: 'HR staff not found' });
          }
          res.json({ hr_staff: hrStaff });
      } catch (error) {
          console.error('Error fetching single HR staff:', error);
          res.status(500).json({ message: 'Failed to fetch HR staff' });
      }
}
  
const postHRStaffCon = async (req, res) => {
      const { full_name, position, department_id, contact, salary, history, image_path } = req.body;
      try {
          const newHRStaff = await insertHRStaff(full_name, position, department_id, contact, salary, history, image_path);
          res.status(201).json({ hr_staff: newHRStaff });
      } catch (error) {
          console.error('Error creating HR staff:', error);
          res.status(500).json({ message: 'Failed to create HR staff' });
      }
  }
  
const deleteSingleHRStaffCon = async (req, res) => {
      try {
          const deletedHRStaff = await deleteSingleHRStaff(req.params.hr_id);
          if (!deletedHRStaff) {
              return res.status(404).json({ message: 'HR staff not found' });
          }
          res.json({ message: 'HR staff deleted successfully' });
      } catch (error) {
          console.error('Error deleting HR staff:', error);
          res.status(500).json({ message: 'Failed to delete HR staff' });
      }
}
  
const patchHRStaffCon = async (req, res) => {
      const { full_name, position, department_id, contact, salary, history, image_path } = req.body;
      try {
          const updatedHRStaff = await updateHRStaff(full_name, position, department_id, contact, salary, history, image_path, req.params.hr_id);
          if (!updatedHRStaff) {
              return res.status(404).json({ message: 'HR staff not found for update' });
          }
          res.json({ hr_staff: updatedHRStaff });
      } catch (error) {
          console.error('Error updating HR staff:', error);
          res.status(500).json({ message: 'Failed to update HR staff' });
      }
}
  
export { 
    getHRStaffCon, 
    getSingleHRStaffCon, 
    postHRStaffCon, 
    deleteSingleHRStaffCon, 
    patchHRStaffCon 
};
  