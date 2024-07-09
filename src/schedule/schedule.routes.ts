import express from "express";
import { ScheduleController } from "./schedule.controller";
import { ScheduleRepository } from "./schedule.repository";

const router = express.Router();
const scheduleController = new ScheduleController(new ScheduleRepository());

router.get('/schedules', scheduleController.getAllSchedules.bind(scheduleController));
router.get('/schedules/state/:state', scheduleController.getSchedulebyState.bind(scheduleController));
router.get('/schedules/:id', scheduleController.getScheduleById.bind(scheduleController));
router.post('/schedules', scheduleController.createSchedule.bind(scheduleController));
router.put('/schedules/:id', scheduleController.updateSchedule.bind(scheduleController));
router.delete('/schedules/:id', scheduleController.deleteSchedule.bind(scheduleController));
router.get('/schedules/date/:date', scheduleController.getSchedulebyDate.bind(scheduleController));
router.get('/schedules/employee/:id_employee/date/:date', scheduleController.getSchedulebyIdEmployee.bind(scheduleController));

export default router;