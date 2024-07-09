import express from "express";
import { ConsultationReasonController } from "./consultation-reason.controller";
import { ConsultationReasonRepository } from "./consultation-reason.repository";


const router = express.Router();
const employeeController = new ConsultationReasonController(new ConsultationReasonRepository());

router.get('/consultation-reasons', employeeController.getAllConsultationReasons.bind(employeeController));
router.get('/consultation-reasons/:id', employeeController.getConsultationReasonById.bind(employeeController));
router.post('/consultation-reasons', employeeController.createConsultationReason.bind(employeeController));
router.put('/consultation-reasons/:id', employeeController.updateConsultationReason.bind(employeeController));
router.delete('/consultation-reasons/:id', employeeController.deleteConsultationReason.bind(employeeController));


export default router;