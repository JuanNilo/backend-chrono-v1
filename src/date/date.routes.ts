import express from "express";
import { DateController } from "./date.controller";
import { DateRepository } from "./date.repository";


const router = express.Router();
const dateController = new DateController(new DateRepository());

router.get('/dates', dateController.getAllDates.bind(dateController));
router.get('/dates/patient/:patient_id', dateController.getDatesByPatientId.bind(dateController));
router.get('/dates/officer/:officer_id', dateController.getDatesByDoctorId.bind(dateController));
router.get('/dates/status/:status', dateController.getDatesByStatus.bind(dateController));
router.get('/dates/data/:id', dateController.getData.bind(dateController));
router.get('/dates/:id', dateController.getDateById.bind(dateController));
router.post('/dates', dateController.createDate.bind(dateController));
router.put('/dates/:id', dateController.updateDate.bind(dateController));
router.delete('/dates/:id', dateController.deleteDate.bind(dateController));

export default router;