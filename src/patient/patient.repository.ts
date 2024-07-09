
import { DatabaseRepository, Query, Id } from "../declarations";
import { Patient } from "./entities/patient";
import { Employee } from "../employee/entities/employee";
import database from "../config/db";

export class PatientRepository implements DatabaseRepository<Patient> {
    async create(data: Partial<Patient>, query?: Query): Promise<Patient> {
        const repoPatient = database.getRepository(Patient);
        const repoEmployee = database.getRepository(Employee);

        // verifico si la combinacion de email y rut ya existe en la base de datos de pacientes.
        const existingPatient = await repoPatient.findOne({ where: [{ email: data.email }, { rut: data.rut }] });
        if (existingPatient) {
            throw new Error('Existing patient found');
        }
        // verifico si la combinacion de email y rut ya existe en la base de datos de empleados.
        const existingEmployee = await repoEmployee.findOne({ where: [{ email: data.email }, { rut: data.rut }] });
        if (existingEmployee) {
            throw new Error('Employee already exists, please log in instead');
        }
        const patient = repoPatient.create(data);
        await repoPatient.save(patient);
        return patient;

    }

    async list(query?: Query): Promise<Patient[]> {
        const repository = database.getRepository(Patient);
        return repository.find();
    }

    async get(id: Id | number, query?: Query): Promise<Patient> {
        const repository = database.getRepository(Patient);
        const patient = await repository.findOneBy({ id: id as any });
        if (!patient) {
            throw new Error('Patient not found');
        }
        return patient;
    }

    async update(id: Id | number, data: Patient, query?: Query): Promise<Patient> {
        const repository = database.getRepository(Patient);
        const patient = await repository.update(id, data);
        if (!patient) {
            throw new Error('Patient not found');
        }
        return this.get(id, query);
    }

    async remove(id: Id | number, query?: Query): Promise<Patient> {
        const repository = database.getRepository(Patient);
        const patient = await this.get(id, query);
        if (!patient) {
            throw new Error('Patient not found');
        }
        await repository.remove(patient);
        return patient;
    }
    async getPatientByEmail(email: string): Promise<Patient> {
        const repository = database.getRepository(Patient);
        const patient = await repository.findOneBy({ email: email as any });
        if (!patient) {
            throw new Error('Patient not found');
        }
        return patient;
    }

    async getPatientByRut(rut: string): Promise<Patient> {
        const repository = database.getRepository(Patient);
        const patient = await repository.findOneBy({ rut: rut as any });
        if (!patient) {
            throw new Error('Patient not found');
        }
        return patient;
    }
}