import { DateRepository } from "./date.repository";
import { Request, Response, NextFunction } from 'express';
import { Date } from "./entities/date";

export class DateController{
    constructor(private repository: DateRepository ){}
    async createDate (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const date = await this.repository.create(req.body);
          res.status(201).json(date);
        }
        catch(error){
          next(error);
        }
    }

    async getAllDates (req: Request, res: Response, next: NextFunction): Promise<Date[] | undefined> {
        try{
          const dates = await this.repository.list();
          res.json(dates);
          if (dates.length === 0) {
            res.status(204).send();
          }
          return dates;
        }
        catch(error){
          next(error);
        }
      }
    
      async getDateById (req: Request, res: Response, next: NextFunction): Promise<Date | undefined> {
        try{
          const date = await this.repository.get(req.params.id);
          if(!date) res.status(404).send();
          res.status(200).json(date);
          return date;
        }
        catch(error){
          next(error);
        }
      }
    
      async updateDate (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const date = await this.repository.update(req.params.id, req.body);
          res.status(200).json(date);
        }
        catch(error){
          next(error);
        }
      }

    async deleteDate (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const date = await this.repository.remove(req.params.id);
          res.status(200).json(date);
        }
        catch(error){
          next(error);
        }
    }

    async getDatesByPatientId (req: Request, res: Response, next: NextFunction): Promise < { date: Date, patientName: string, patientLastname: string, medicName: string, medicLastName: string, day: string, hour: string, consultationReason: string, consultationReasonDescription: string }[] | undefined> {
        try{
          const data = await this.repository.getByIdPatient(req.params.patient_id);
          if(!data) res.status(404).send();
          res.status(200).json(data);
          return data;
        }
        catch(error){
          next(error);
        }
    }

    async getDatesByDoctorId (req: Request, res: Response, next: NextFunction): Promise<{ date: Date, patientName: string, patientLastname: string, medicName: string, medicLastName: string, day: string, hour: string, consultationReason: string, consultationReasonDescription: string }[] | undefined> {
        try{
          const data = await this.repository.getByIdDoctor(req.params.officer_id);
          if(!data) res.status(404).send();
          res.status(200).json(data);
          return data;
        }
        catch(error){
          next(error);
        }
    }

    async getDatesByStatus (req: Request, res: Response, next: NextFunction): Promise<Date[] | undefined> { 
        try{
          const dates = await this.repository.getDatesByStatus(req.params.status);
          if(!dates) res.status(404).send();
          res.status(200).json(dates);
          return dates;
        }
        catch(error){
          next(error);
        }
    }

    async getData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const data = await this.repository.getData(req.params.id);
          res.status(200).json(data);
        }
        catch(error){
          next(error);
        }
    }

}