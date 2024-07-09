import { Request, Response, NextFunction } from 'express';
import { Patient } from './entities/patient';
import { PatientRepository } from './patient.repository';
import { transporter } from '../config/transporter';


export class PatientController{
    constructor(private repository: PatientRepository ){}
    async createPatient (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const patient = await this.repository.create(req.body);
          res.status(201).json(patient);
        }
        catch(error){
          next(error);
        }
    }
    
    async getAllPatients (req: Request, res: Response, next: NextFunction): Promise<Patient[] | undefined> {
        try{
          const patients = await this.repository.list();
          res.json(patients);
          if (patients.length === 0) {
            res.status(204).send();
          }
          return patients;
        }
        catch(error){
          next(error);
        }
      }
    
      async getPatientById (req: Request, res: Response, next: NextFunction): Promise<Patient | undefined> {
        try{
          const patient = await this.repository.get(req.params.id);
          if(!patient) res.status(404).send();
          res.status(200).json(patient);
          return patient;
        }
        catch(error){
          next(error);
        }
      }
    
      async updatePatient (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const patient = await this.repository.update(req.params.id, req.body);
          res.status(200).json(patient);
        }
        catch(error){
          next(error);
        }
      }
    async deletePatient (req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
          const patient = await this.repository.remove(req.params.id);
          res.status(200).json(patient);
        }
        catch(error){
          next(error);
        }
    }

    async forgetPassword (req: Request, res: Response, next: NextFunction): Promise<string | undefined> {
      try{
        const patient = await this.repository.getPatientByEmail(req.params.email);
  
        let code = '';
  
        for (let i = 0; i < 5; i++) {
          const randomNumber = Math.floor(Math.random() * 10);
          code += randomNumber;
        }
  
        const mailOptions={
          from: process.env.NODEMAILER_USER,
          to: patient.email,
          subject: 'Restablecimiento de Contraseña',
          text: `Su código de recuperación es: ${code}`
        };
  
        await transporter.sendMail(mailOptions);
  
        res.status(200).json({message: 'Código enviado'});
  
        return code;
        
      }
      catch(error){
        next(error);
      }
    }
  
    async codeComparition (req: Request, res: Response, next: NextFunction): Promise<boolean> {
      if (req.body.code === req.body.inputCode) {
        res.status(200).json({message: 'Código correcto'});
        return true;
      }
      else{
        res.status(400).json({message: 'Código incorrecto'});
        return false;
      }
    }

    async getPatientByRut (req: Request, res: Response, next: NextFunction): Promise<Patient | undefined> {
      try{
        const patient = await this.repository.getPatientByRut(req.params.rut);
        if(!patient) res.status(404).send();
        res.status(200).json(patient);
        return patient;
      }
      catch(error){
        next(error);
      }
    }
  
}
