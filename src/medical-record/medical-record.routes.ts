import express from "express";
import { MedicalRecordController } from "./medical-record.controller";
import { MedicalRecordRepository } from "./medical-record.repository";

const router = express.Router();
const medicalRecordController = new MedicalRecordController(new MedicalRecordRepository());

router.get('/medical-records', medicalRecordController.getAllMedicalRecords.bind(medicalRecordController));
router.get('/medical-records/date/:id_date', medicalRecordController.getMedicalRecordByDate.bind(medicalRecordController));
router.get('/medical-records/patient/:patient_id', medicalRecordController.getMedicalRecordByIdPatient.bind(medicalRecordController));
router.get('/medical-records/doctor/:doctor_id', medicalRecordController.getMedicalRecordByIdDoctor.bind(medicalRecordController));
router.get('/medical-records/:id', medicalRecordController.getMedicalRecordById.bind(medicalRecordController));
router.post('/medical-records', medicalRecordController.createMedicalRecord.bind(medicalRecordController));
router.put('/medical-records/:id', medicalRecordController.updateMedicalRecord.bind(medicalRecordController));
router.delete('/medical-records/:id', medicalRecordController.deleteMedicalRecord.bind(medicalRecordController));

export default router;