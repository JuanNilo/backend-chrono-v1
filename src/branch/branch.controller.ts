import { Request, Response, NextFunction } from "express";
import { BranchRepository } from "./branch.repository";
import { Branch } from "./entities/branch";

export class BranchController{
    constructor(private branchRepository: BranchRepository) {}
    async createBranch (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const branch = await this.branchRepository.create(req.body);
          res.status(201).json(branch);
        }
        catch(error){
          next(error);
        }
    }

    async getAllBranches (req: Request, res: Response, next: NextFunction): Promise<Branch[] | undefined> {
        try{
          const branches = await this.branchRepository.list();
          res.json(branches);
          if (branches.length === 0) {
            res.status(204).send();
          }
          return branches;
        }
        catch(error){
          next(error);
        }
    }

    async getBranchById (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const branch = await this.branchRepository.get(req.params.id);
          if(!branch) res.status(404).send();
          res.status(200).json(branch);
        }
        catch(error){
          next(error);
        }
    }

    async updateBranch (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const branch = await this.branchRepository.update(req.params.id, req.body);
          res.status(200).json(branch);
        }
        catch(error){
          next(error);
        }
    }

    async deleteBranch (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const branch = await this.branchRepository.remove(req.params.id);
          res.status(200).json(branch);
        }
        catch(error){
          next(error);
        }
    }
}