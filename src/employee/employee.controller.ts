import { EmployeeRepository } from "./employee.repository";
import { Request, Response, NextFunction } from 'express';
import { Employee } from "./entities/employee";

export class EmployeeController{
    constructor(private repository: EmployeeRepository ){}
    async createEmployee (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const employee = await this.repository.create(req.body);
          res.status(201).json(employee);
        }
        catch(error){
          next(error);
        }
    }

    async getAllEmployees (req: Request, res: Response, next: NextFunction): Promise<Employee[] | undefined> {
        try{
          const employees = await this.repository.list();
          res.json(employees);
          if (employees.length === 0) {
            res.status(204).send();
          }
          return employees;
        }
        catch(error){
          next(error);
        }
    }

    async getEmployeeById (req: Request, res: Response, next: NextFunction): Promise<Employee | undefined> {
        try{
          const employee = await this.repository.get(req.params.id);
          if(!employee) res.status(404).send();
          res.status(200).json(employee);
          return employee;
        }
        catch(error){
          next(error);
        }
    }

    async updateEmployee (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const employee = await this.repository.update(req.params.id, req.body);
          res.status(200).json(employee);
        }
        catch(error){
          next(error);
        }
    }

    async deleteEmployee (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const employee = await this.repository.remove(req.params.id);
          res.status(200).json(employee);
        }
        catch(error){
          next(error);
        }
    }

    async getEmployeeByEmail (req: Request, res: Response, next: NextFunction): Promise<Employee | undefined> {
        try{
          const employee = await this.repository.getEmployeeByEmail(req.params.email);
          if(!employee) res.status(404).send();
          res.status(200).json(employee);
          return employee;
        }
        catch(error){
          next(error);
        }
    }

    async getAllMedics (req: Request, res: Response, next: NextFunction): Promise<Employee[] | undefined> {
        try{
          const employees = await this.repository.getAllMedics();
          res.json(employees);
          if (employees.length === 0) {
            res.status(204).send();
          }
          return employees;
        }
        catch(error){
          next(error);
        }
    }

    async getAllMedicsBySpeciality (req: Request, res: Response, next: NextFunction): Promise<Employee[] | undefined> {
        try{
          const employees = await this.repository.getEmployeeBySpeciality(req.params.id_speciality);
          res.json(employees);
          if (employees.length === 0) {
            res.status(204).send();
          }
          return employees;
        }
        catch(error){
          next(error);
        }
    }
}