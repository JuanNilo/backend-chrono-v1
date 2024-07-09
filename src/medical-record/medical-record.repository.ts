import { DatabaseRepository, Id, Query } from "../declarations";
import { MedicalRecord } from "./entities/medical-record";
import database from "../config/db";
import { Employee } from "../employee/entities/employee";
import { Patient } from "../patient/entities/patient";

export class MedicalRecordRepository implements DatabaseRepository<MedicalRecord> {
    async create(data: Partial<MedicalRecord>, query?: Query): Promise<MedicalRecord> {
        const repository = database.getRepository(MedicalRecord);
        const medicalRecord = repository.create(data);
        await repository.save(medicalRecord);
        return medicalRecord;
    }

    async list(query?: Query): Promise<MedicalRecord[]> {
        const repository = database.getRepository(MedicalRecord);
        return repository.find();
    }

    async get(id: Id, query?: Query): Promise<MedicalRecord> {
        const repository = database.getRepository(MedicalRecord);
        const medicalRecord = await repository.findOneBy({ id: id as any });
        if (!medicalRecord) {
            throw new Error('MedicalRecord not found');
        }
        return medicalRecord;
    }

    async update(id: Id, data: MedicalRecord, query?: Query): Promise<MedicalRecord> {
        const repository = database.getRepository(MedicalRecord);
        const medicalRecord = await repository.update(id, data);
        if (!medicalRecord) {
            throw new Error('MedicalRecord not found');
        }
        return this.get(id, query);
    }

    async remove(id: Id, query?: Query): Promise<MedicalRecord> {
        const repository = database.getRepository(MedicalRecord);
        const medicalRecord = await this.get(id, query);
        if (!medicalRecord) {
            throw new Error('MedicalRecord not found');
        }
        await repository.remove(medicalRecord);
        return medicalRecord;
    }

    async getByIdPatient(id_patient: Id, query?: Query): Promise<{medicalRecord: MedicalRecord, patientName: string, patientLastname: string, medicName: string, medicLastName: string }[]> {
        const repository = database.getRepository(MedicalRecord);
        const medicalRecords = await repository.find({ where: { id_patient: id_patient as any } });
        if (!medicalRecords) {
            throw new Error('MedicalRecord not found');
        }
        const patient = await database.getRepository(Patient).findOneBy({id: id_patient as any});
        if (!patient) {
            throw new Error('Patient not found');
        }
        const data: { medicalRecord: MedicalRecord, patientName: string, patientLastname: string, medicName: string, medicLastName: string }[] = [];

        for (const medicalRecord of medicalRecords) {
            const medic = await database.getRepository(Employee).findOneBy({ id: medicalRecord.id_employee });
            const medicName = medic ? medic.name : 'Unknown Medic';
            const medicLastname = medic ? medic.lastname : '';
            data.push({
                medicalRecord: medicalRecord,
                patientName: patient.name,
                patientLastname: patient.lastname,
                medicName: medicName,
                medicLastName: medicLastname,
            });
        }
        return data;
    }

    async getByIdDoctor(id_employee: Id, query?: Query): Promise<{medicalRecord: MedicalRecord, patientName: string, patientLastname: string, medicName: string, medicLastName: string }[]> {
        const repository = database.getRepository(MedicalRecord);
        const medicalRecords = await repository.find({ where: { id_employee: id_employee as any } });
        if (!medicalRecords) {
            throw new Error('MedicalRecord not found');
        }
        const medic = await database.getRepository(Employee).findOneBy({id: id_employee as any});
        if (!medic) {
            throw new Error('Medic not found');
        }
        const data: { medicalRecord: MedicalRecord, patientName: string, patientLastname: string, medicName: string, medicLastName: string }[] = [];

        for (const medicalRecord of medicalRecords) {
            const patient = await database.getRepository(Patient).findOneBy({ id: medicalRecord.id_patient });
            const patientName = patient ? patient.name : 'Unknown Patient';
            const patientLastname = patient ? patient.lastname : '';
            data.push({
                medicalRecord: medicalRecord,
                patientName: patientName,
                patientLastname: patientLastname,
                medicName: medic?.name || 'Unknown Medic',
                medicLastName: medic?.lastname || '',
            });
        }
        return data;
    }

    async getMedicalRecordsByIdDate(id_date: Id, query?: Query): Promise<{medicalRecord: MedicalRecord, patientName: string, patientLastname: string, medicName: string, medicLastName: string }[]> {
        const repository = database.getRepository(MedicalRecord);
        const medicalRecords = await repository.find({ where: { id_date: id_date as any } });
        if (!medicalRecords) {
            throw new Error('MedicalRecord not found');
        }
        const data: { medicalRecord: MedicalRecord, patientName: string, patientLastname: string, medicName: string, medicLastName: string }[] = [];

        for (const medicalRecord of medicalRecords) {
            const patient = await database.getRepository(Patient).findOneBy({ id: medicalRecord.id_patient });
            const patientName = patient ? patient.name : 'Unknown Patient';
            const patientLastname = patient ? patient.lastname : '';
            const medic = await database.getRepository(Employee).findOneBy({ id: medicalRecord.id_employee });
            const medicName = medic ? medic.name : 'Unknown Medic';
            const medicLastname = medic ? medic.lastname : '';
            data.push({
                medicalRecord: medicalRecord,
                patientName: patientName,
                patientLastname: patientLastname,
                medicName: medicName,
                medicLastName: medicLastname,
            });
        }
        return data;
    }
}