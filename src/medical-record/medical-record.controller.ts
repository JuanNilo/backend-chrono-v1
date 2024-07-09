import { MedicalRecordRepository } from "./medical-record.repository";
import { Request, Response, NextFunction } from 'express';
import { MedicalRecord } from "./entities/medical-record";
import { Patient } from "../patient/entities/patient";
import database from "../config/db";
import { Employee } from "../employee/entities/employee";

export class MedicalRecordController{
    constructor(private repository: MedicalRecordRepository ){}
    async createMedicalRecord (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const medicalRecord = await this.repository.create(req.body);
          res.status(201).json(medicalRecord);
        }
        catch(error){
          next(error);
        }
    }

    async getAllMedicalRecords (req: Request, res: Response, next: NextFunction): Promise<MedicalRecord[] | undefined> {
        try{
          const medicalRecords = await this.repository.list();
          res.json(medicalRecords);
          if (medicalRecords.length === 0) {
            res.status(204).send();
          }
          return medicalRecords;
        }
        catch(error){
          next(error);
        }
    }

    async getMedicalRecordById (req: Request, res: Response, next: NextFunction): Promise<MedicalRecord | undefined> {
        try{
          const medicalRecord = await this.repository.get(req.params.id);
          if(!medicalRecord) res.status(404).send();
          res.status(200).json(medicalRecord);
          return medicalRecord;
        }
        catch(error){
          next(error);
        }
    }

    async updateMedicalRecord (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const medicalRecord = await this.repository.update(req.params.id, req.body);
          res.status(200).json(medicalRecord);
        }
        catch(error){
          next(error);
        }
    }

    async deleteMedicalRecord (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const medicalRecord = await this.repository.remove(req.params.id);
          res.status(200).json(medicalRecord);
        }
        catch(error){
          next(error);
        }
    }

    async getMedicalRecordByIdPatient (req: Request, res: Response, next: NextFunction): Promise<{medicalRecord: MedicalRecord, patientName: string, patientLastname: string, medicName: string, medicLastName: string }[] | undefined> {
        try{
          const medicalRecords = await this.repository.getByIdPatient(req.params.patient_id);
          if(!medicalRecords) res.status(404).send();
          res.status(200).json(medicalRecords);

          return medicalRecords;
        }
        catch(error){
          next(error);
        }
    }

    async getMedicalRecordByIdDoctor (req: Request, res: Response, next: NextFunction): Promise<{medicalRecord: MedicalRecord, patientName: string, patientLastname: string, medicName: string, medicLastName: string }[] | undefined> {
        try{
          const medicalRecords = await this.repository.getByIdDoctor(req.params.doctor_id);
          if(!medicalRecords) res.status(404).send();
          res.status(200).json(medicalRecords);
          return medicalRecords;
        }
        catch(error){
          next(error);
        }
    }

    async getMedicalRecordByDate (req: Request, res: Response, next: NextFunction): Promise<{medicalRecord: MedicalRecord, patientName: string, patientLastname: string, medicName: string, medicLastName: string }[] | undefined> {
        try{
          const medicalRecords = await this.repository.getMedicalRecordsByIdDate(req.params.id_date);
          if(!medicalRecords) res.status(404).send();
          res.status(200).json(medicalRecords);
          return medicalRecords;
        }
        catch(error){
          next(error);
        }
    }
}