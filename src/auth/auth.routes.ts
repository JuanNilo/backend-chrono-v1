import express from 'express';
import { AuthController } from './auth.controller';
import { PatientRepository } from '../patient/patient.repository';
import { EmployeeRepository } from '../employee/employee.repository';
const router = express.Router();
const authController = new AuthController(new PatientRepository(), new EmployeeRepository());

router.post('/login', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));

export default router;