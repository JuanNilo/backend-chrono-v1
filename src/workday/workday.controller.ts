import { WorkdayRepository } from "./workday.repository";
import { Workday } from "./entities/workday";
import { Request, Response, NextFunction } from "express";

export class WorkdayController{
    constructor(private repository: WorkdayRepository ){}
    async createWorkday (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const workday = await this.repository.create(req.body);
          res.status(201).json(workday);
        }
        catch(error){
          next(error);
        }
    }

    async getAllWorkdays (req: Request, res: Response, next: NextFunction): Promise<Workday[] | undefined> {
        try{
          const workdays = await this.repository.list();
          res.json(workdays);
          if (workdays.length === 0) {
            res.status(204).send();
          }
          return workdays;
        }
        catch(error){
          next(error);
        }
    }

    async getWorkdayById (req: Request, res: Response, next: NextFunction): Promise<Workday | undefined> {
        try{
          const workday = await this.repository.get(req.params.id);
          if(!workday) res.status(404).send();
          res.status(200).json(workday);
          return workday;
        }
        catch(error){
          next(error);
        }
    }

    async updateWorkday (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const workday = await this.repository.update(req.params.id, req.body);
          res.status(200).json(workday);
        }
        catch(error){
          next(error);
        }
    }

    async deleteWorkday (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const workday = await this.repository.remove(req.params.id);
          res.status(200).json(workday);
        }
        catch(error){
          next(error);
        }
    }

}