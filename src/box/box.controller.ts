import { Request, Response, NextFunction } from "express";
import { BoxRepository } from "./box.repository";
import { Box } from "./entities/box";

export class BoxController{
    constructor(private boxRepository: BoxRepository) {}
    async createBranch (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const box = await this.boxRepository.create(req.body);
          res.status(201).json(box);
        }
        catch(error){
          next(error);
        }
    }

    async getAllBranches (req: Request, res: Response, next: NextFunction): Promise<Box[] | undefined> {
        try{
          const boxes = await this.boxRepository.list();
          res.json(boxes);
          if (boxes.length === 0) {
            res.status(204).send();
          }
          return boxes;
        }
        catch(error){
          next(error);
        }
    }

    async getBranchById (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const box = await this.boxRepository.get(req.params.id);
          if(!box) res.status(404).send();
          res.status(200).json(box);
        }
        catch(error){
          next(error);
        }
    }

    async updateBranch (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const box = await this.boxRepository.update(req.params.id, req.body);
          res.status(200).json(box);
        }
        catch(error){
          next(error);
        }
    }

    async deleteBranch (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const box = await this.boxRepository.remove(req.params.id);
          res.status(200).json(box);
        }
        catch(error){
          next(error);
        }
    }
}