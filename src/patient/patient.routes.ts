import express from 'express';
import { PatientController } from './patient.controller';
import { PatientRepository } from './patient.repository'; 

const router = express.Router();
const patientController = new PatientController(new PatientRepository());

router.get('/users', patientController.getAllPatients.bind(patientController));
router.get('/users/rut/:rut', patientController.getPatientByRut.bind(patientController));
router.get('/users/:id', patientController.getPatientById.bind(patientController));
router.post('/users', patientController.createPatient.bind(patientController));
router.put('/users/:id', patientController.updatePatient.bind(patientController));
router.delete('/users/:id', patientController.deletePatient.bind(patientController));

export default router;