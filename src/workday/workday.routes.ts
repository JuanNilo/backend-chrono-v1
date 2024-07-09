import express from "express";
import { WorkdayController } from "./workday.controller";
import { WorkdayRepository } from "./workday.repository";

const router = express.Router();
const workdayController = new WorkdayController(new WorkdayRepository());

router.get('/workdays', workdayController.getAllWorkdays.bind(workdayController));
router.get('/workdays/:id', workdayController.getWorkdayById.bind(workdayController));
router.post('/workdays', workdayController.createWorkday.bind(workdayController));
router.put('/workdays/:id', workdayController.updateWorkday.bind(workdayController));
router.delete('/workdays/:id', workdayController.deleteWorkday.bind(workdayController));

export default router;