import express from "express";
import { SpecialityController } from "./speciality.controller";
import { SpecialityRepository } from "./speciality.repository";

const router = express.Router();
const specialityController = new SpecialityController(new SpecialityRepository());

router.get('/specialities', specialityController.getAllSpecialities.bind(specialityController));
router.get('/specialities/medics', specialityController.getAllMedics.bind(specialityController));
router.get('/specialities/:id', specialityController.getSpecialityById.bind(specialityController));
router.post('/specialities', specialityController.createSpeciality.bind(specialityController));
router.put('/specialities/:id', specialityController.updateSpeciality.bind(specialityController));
router.delete('/specialities/:id', specialityController.deleteSpeciality.bind(specialityController));


export default router;