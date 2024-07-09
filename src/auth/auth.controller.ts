import { Request, Response, NextFunction } from "express";
import { PatientRepository } from "../patient/patient.repository";
import { EmployeeRepository } from "../employee/employee.repository";
import { error } from "console";


export class AuthController {
    constructor(private patientRepository: PatientRepository, private employeRepository: EmployeeRepository) { }


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await this.patientRepository.getPatientByEmail(req.body.email);
            if (patient && patient.password === req.body.password) {
                return res.status(200).json({ ...patient, role: 'patient' });
            }
        } catch {
            try {
                const employee = await this.employeRepository.getEmployeeByEmail(req.body.email);
                if (employee && employee.password === req.body.password) {
                    if (employee.id_speciality === 2) {
                        return res.status(200).json({ ...employee, role: 'secretary' });
                    }
                    return res.status(200).json({ ...employee, role: 'employee' });
                }
            } catch {
                res.status(400).json({ message: "User not found" });
            }
            res.status(400).json({ message: "User not found" });
        }

    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const patient = await this.patientRepository.getPatientByEmail(req.body.email);
            res.status(400).json({ message: "User already exists" });
        } catch {
            const newPatient = await this.patientRepository.create(req.body);
            return res.status(201).json(newPatient);
        }

    }
}
