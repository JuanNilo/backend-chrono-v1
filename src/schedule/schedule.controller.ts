import { ScheduleRepository } from "./schedule.repository";
import { Schedule } from "./entities/schedule";
import { Request, Response, NextFunction } from "express";

export class ScheduleController{
    constructor(private repository: ScheduleRepository ){}
    async createSchedule (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const schedule = await this.repository.create(req.body);
          res.status(201).json(schedule);
        }
        catch(error){
          next(error);
        }
    }

    async getAllSchedules (req: Request, res: Response, next: NextFunction): Promise<Schedule[] | undefined> {
        try{
          const schedules = await this.repository.list();
          res.json(schedules);
          if (schedules.length === 0) {
            res.status(204).send();
          }
          return schedules;
        }
        catch(error){
          next(error);
        }
    }

    async getScheduleById (req: Request, res: Response, next: NextFunction): Promise<Schedule | undefined> {
        try{
          const schedule = await this.repository.get(req.params.id);
          if(!schedule) res.status(404).send();
          res.status(200).json(schedule);
          return schedule;
        }
        catch(error){
          next(error);
        }
    }

    async updateSchedule (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const schedule = await this.repository.update(req.params.id, req.body);
          res.status(200).json(schedule);
        }
        catch(error){
          next(error);
        }
    }

    async deleteSchedule (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const schedule = await this.repository.remove(req.params.id);
          res.status(200).json(schedule);
        }
        catch(error){
          next(error);
        }
    }

    async getSchedulebyIdEmployee (req: Request, res: Response, next: NextFunction): Promise<Schedule[] | undefined> {
        try{
          const schedules = await this.repository.getScheduleByEmployee(req.params.id_employee, req.params.date);
          res.json(schedules);
          if (schedules.length === 0) {
            res.status(204).send();
          }
          return schedules;
        }
        catch(error){
          next(error);
        }
    }

    async getSchedulebyDate (req: Request, res: Response, next: NextFunction): Promise<Schedule[] | undefined> {
        try{
          const schedules = await this.repository.getScheduleByDate(req.params.date);
          res.json(schedules);
          if (schedules.length === 0) {
            res.status(204).send();
          }
          return schedules;
        }
        catch(error){
          next(error);
        }
    }

    async getSchedulebyState (req: Request, res: Response, next: NextFunction): Promise<Schedule[] | undefined> {
        try{
          const schedules = await this.repository.getScheduleByState(req.params.state);
          res.json(schedules);
          if (schedules.length === 0) {
            res.status(204).send();
          }
          return schedules;
        }
        catch(error){
          next(error);
        }
    }
}