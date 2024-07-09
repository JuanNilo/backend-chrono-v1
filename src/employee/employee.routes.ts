import express from "express";
import { EmployeeController } from "./employee.controller";
import { EmployeeRepository } from "./employee.repository";


const router = express.Router();
const employeeController = new EmployeeController(new EmployeeRepository());

router.get('/employees', employeeController.getAllEmployees.bind(employeeController));
router.get('/employees/medics', employeeController.getAllMedics.bind(employeeController));
router.get('/employees/speciality/:id_speciality', employeeController.getAllMedicsBySpeciality.bind(employeeController));
router.get('/employees/:id', employeeController.getEmployeeById.bind(employeeController));
router.post('/employees', employeeController.createEmployee.bind(employeeController));
router.put('/employees/:id', employeeController.updateEmployee.bind(employeeController));
router.delete('/employees/:id', employeeController.deleteEmployee.bind(employeeController));


export default router;