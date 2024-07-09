import { ConsultationReasonRepository } from "./consultation-reason.repository";
import { ConsultationReason } from "./entities/consultation-reason";
import { Request, Response, NextFunction } from "express";

export class ConsultationReasonController{
    constructor(private repository: ConsultationReasonRepository ){}
    async createConsultationReason (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const consultation_reason = await this.repository.create(req.body);
          res.status(201).json(consultation_reason);
        }
        catch(error){
          next(error);
        }
    }

    async getAllConsultationReasons (req: Request, res: Response, next: NextFunction): Promise<ConsultationReason[] | undefined> {
        try{
          const consultation_reasons = await this.repository.list();
          res.json(consultation_reasons);
          if (consultation_reasons.length === 0) {
            res.status(204).send();
          }
          return consultation_reasons;
        }
        catch(error){
          next(error);
        }
    }

    async getConsultationReasonById (req: Request, res: Response, next: NextFunction): Promise<ConsultationReason | undefined> {
        try{
          const consultation_reason = await this.repository.get(req.params.id);
          if(!consultation_reason) res.status(404).send();
          res.status(200).json(consultation_reason);
          return consultation_reason;
        }
        catch(error){
          next(error);
        }
    }

    async updateConsultationReason (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const consultation_reason = await this.repository.update(req.params.id, req.body);
          res.status(200).json(consultation_reason);
        }
        catch(error){
          next(error);
        }
    }

    async deleteConsultationReason (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const consultation_reason = await this.repository.remove(req.params.id);
          res.status(200).json(consultation_reason);
        }
        catch(error){
          next(error);
        }
    }
}