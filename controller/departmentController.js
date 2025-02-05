import { 
    getDepartments, 
    getSingleDepartment, 
    insertDepartment, 
    deleteSingleDepartment, 
    updateDepartment 
} from "../model/departmentsModal.js";

const getDepartmentsCon = async (req, res) => {
      try {
          const departments = await getDepartments();
          res.json({ departments });
      } catch (error) {
          console.error('Error fetching departments:', error);
          res.status(500).json({ message: 'Failed to fetch departments' });
      }
}
const getSingleDepartmentCon = async (req, res) => {
      try {
          const department = await getSingleDepartment(req.params.department_id);
          if (!department) {
              return res.status(404).json({ message: 'Department not found' });
          }
          res.json({ department });
      } catch (error) {
          console.error('Error fetching department:', error);
          res.status(500).json({ message: 'Failed to fetch department' });
      }
}
  
const postDepartmentCon = async (req, res) => {
      const { department_name } = req.body;
      try {
          const newDepartment = await insertDepartment(department_name);
          res.status(201).json({ department: newDepartment });
      } catch (error) {
          console.error('Error creating department:', error);
          res.status(500).json({ message: 'Failed to create department' });
      }
  }
  const deleteSingleDepartmentCon = async (req, res) => {
      try {
          const deletedDepartment = await deleteSingleDepartment(req.params.department_id);
          if (!deletedDepartment) {
              return res.status(404).json({ message: 'Department not found for deletion' });
          }
          res.json({ message: 'Department deleted successfully' });
      } catch (error) {
          console.error('Error deleting department:', error);
          res.status(500).json({ message: 'Failed to delete department' });
    }}
const patchDepartmentCon = async (req, res) => {
      const { department_name } = req.body;
      try {
          const updatedDepartment = await updateDepartment(department_name, req.params.department_id);
          if (!updatedDepartment) {
              return res.status(404).json({ message: 'Department not found for update' });
          }
          res.json({ department: updatedDepartment });
      } catch (error) {
          console.error('Error updating department:', error);
          res.status(500).json({ message: 'Failed to update department' });
      }
}

export { 
    getDepartmentsCon, 
    getSingleDepartmentCon, 
    postDepartmentCon, 
    deleteSingleDepartmentCon, 
    patchDepartmentCon 
};
  