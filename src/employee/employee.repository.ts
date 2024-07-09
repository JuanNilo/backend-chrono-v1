import { DatabaseRepository, Id, Query } from "../declarations";
import { Employee } from "./entities/employee";
import { Patient } from "../patient/entities/patient";
import database from "../config/db";
import { Not } from "typeorm";
import { Speciality } from "../speciality/entities/speciality";

export class EmployeeRepository implements DatabaseRepository<Employee> {
    async create(data: Partial<Employee>, query?: Query): Promise<Employee> {
        const repoEmployee = database.getRepository(Employee);
        const repoPatient = database.getRepository(Patient);
        const repoSpeciality = database.getRepository(Speciality);

        // verifico si la combinacion de email y rut ya existe en la base de datos de empleados.
        const existingEmployee = await repoEmployee.findOne({ where: [{ email: data.email }, { rut: data.rut }] });
        if (existingEmployee) {
            throw new Error('Employee already exists, please log in instead');
        }
        // verifico si la combinacion de email y rut ya existe en la base de datos de pacientes.
        const existingPatient = await repoPatient.findOne({ where: [{ email: data.email }, { rut: data.rut }] });
        if (existingPatient) {
            throw new Error('Existing patient found');
        }
        // verifico si la especialidad existe en la base de datos.
        const speciality = await repoSpeciality.findOne({ where: { id: data.id_speciality } });
        if (!speciality) {
            throw new Error('Speciality not found');
        }
        const employee = repoEmployee.create(data);
        await repoEmployee.save(employee);
        return employee;

    }

    async list(query?: Query): Promise<Employee[]> {
        const repository = database.getRepository(Employee);
        return repository.find();
    }

    async get(id: Id, query?: Query): Promise<Employee> {
        const repository = database.getRepository(Employee);
        const employee = await repository.findOneBy({ id: id as any });
        if (!employee) {
            throw new Error('Employee not found');
        }
        return employee;
    }

    async update(id: Id, data: Employee, query?: Query): Promise<Employee> {
        const repository = database.getRepository(Employee);
        const employee = await repository.update(id, data);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return this.get(id, query);
    }

    async remove(id: Id, query?: Query): Promise<Employee> {
        const repository = database.getRepository(Employee);
        const employee = await this.get(id, query);
        if (!employee) {
            throw new Error('Employee not found');
        }
        await repository.remove(employee);
        return employee;
    }
    async getEmployeeByEmail(email: string): Promise<Employee> {
        const repository = database.getRepository(Employee);
        const employee = await repository.findOneBy({ email: email as any });
        if (!employee) {
            throw new Error('Employee not found');
        }
        return employee;
    }
    async getAllMedics(): Promise<Employee[]> {
        const repository = database.getRepository(Employee);
        return repository.find({ where: { id_speciality: Not(2) } });
    }

    async getEmployeeBySpeciality(id_speciality: Id): Promise<Employee[]> {
        const repository = database.getRepository(Employee);
        return repository.find({ where: { id_speciality: id_speciality as any } });
    }
}