import { SpecialityRepository } from "./speciality.repository";
import { Speciality } from "./entities/speciality";
import { Request, Response, NextFunction } from "express";

export class SpecialityController{
    constructor(private repository: SpecialityRepository ){}
    async createSpeciality (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const speciality = await this.repository.create(req.body);
          res.status(201).json(speciality);
        }
        catch(error){
          next(error);
        }
    }

    async getAllSpecialities (req: Request, res: Response, next: NextFunction): Promise<Speciality[] | undefined> {
        try{
          const specialities = await this.repository.list();
          res.json(specialities);
          if (specialities.length === 0) {
            res.status(204).send();
          }
          return specialities;
        }
        catch(error){
          next(error);
        }
    }

    async getSpecialityById (req: Request, res: Response, next: NextFunction): Promise<Speciality | undefined> {
        try{
          const speciality = await this.repository.get(req.params.id);
          if(!speciality) res.status(404).send();
          res.status(200).json(speciality);
          return speciality;
        }
        catch(error){
          next(error);
        }
    }

    async updateSpeciality (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const speciality = await this.repository.update(req.params.id, req.body);
          res.status(200).json(speciality);
        }
        catch(error){
          next(error);
        }
    }

    async deleteSpeciality (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const speciality = await this.repository.remove(req.params.id);
          res.status(200).json(speciality);
        }
        catch(error){
          next(error);
        }
    }

    async getAllMedics(req: Request, res: Response, next: NextFunction): Promise<Speciality[] | undefined> {
        try {
            const medics = await this.repository.getAllMedics();
            if (medics.length === 0) {
                res.status(204).send();
            }
            res.json(medics);
            return medics;
        } catch (error) {
            next(error);
        }
    }
}