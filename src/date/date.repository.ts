import { Date } from "./entities/date";
import { DatabaseRepository, Id, Query } from '../declarations';
import database from "../config/db";
import { MedicalRecord } from "../medical-record/entities/medical-record";
import { Schedule } from "../schedule/entities/schedule";
import { Patient } from "../patient/entities/patient";
import { Employee } from "../employee/entities/employee";
import { transporter } from "../config/transporter";
import { ConsultationReason } from "../consultation-reason/entities/consultation-reason";

export class DateRepository implements DatabaseRepository<Date>{
    async create(data: Partial<Date>, query?: Query): Promise<Date> {
        const repository = database.getRepository(Date); 
        const search = await repository.findOneBy({time_id: data.time_id as any});
        if (search) {
            throw new Error('Date already exists');
        }
        const date = repository.create(data);
        await repository.save(date);
        const scheduleRepository = database.getRepository(Schedule);
        const schedule = await scheduleRepository.findOneBy({id: data.time_id as any});
        if (schedule) {
            await scheduleRepository.update( schedule?.id ,{state: false});
        }
        else{
            throw new Error('Schedule not found');
        }
        await this.sendEmail(date, 'creada');
        return date;
    }

    async list(query?: Query): Promise<Date[]> {
        const repository = database.getRepository(Date);
        return repository.find();
    }

    async get(id: Id, query?: Query): Promise<Date> {
        const repository = database.getRepository(Date);
        const date = await repository.findOneBy({id: id as any});
        if (!date) {
            throw new Error('Date not found');
        }
        
        return date;
    }

    async update(id: Id, data: Date, query?: Query): Promise<Date> {
        const repository = database.getRepository(Date);
        const date = await repository.update(id, data);
        if (!date) {
            throw new Error('Date not found');
        }
        await this.sendEmail(data, 'actualizada');
        return this.get(id, query);
    }

    async remove(id: Id, query?: Query): Promise<Date> {
        const repository = database.getRepository(Date);
        const date = await this.get(id, query);
        if (!date) {
            throw new Error('Date not found');
        }
        await repository.remove(date);
        return date;
    }

    async getByIdPatient(patient_id: Id, query?: Query): Promise<{ date: Date, patientName: string, patientLastname: string, medicName: string, medicLastName: string, day: string, hour: string, consultationReason: string, consultationReasonDescription: string }[]>{
        const repository = database.getRepository(Date);
        const dates = await repository.find({where: {patient_id: patient_id as any}});
        if (!dates) {
            throw new Error('Date not found');
        }
        const patient = await database.getRepository(Patient).findOneBy({id: patient_id as any});
        if (!patient) {
            throw new Error('Patient not found');
        }
        const data: { date: Date, patientName: string, patientLastname: string, medicName: string, medicLastName: string, day: string, hour: string, consultationReason: string, consultationReasonDescription: string }[] = [];

        for (const date of dates) {
            const medic = await database.getRepository(Employee).findOneBy({ id: date.officer_id });
            const medicName = medic ? medic.name : 'Unknown Medic';
            const medicLastname = medic ? medic.lastname : '';
            const time = await database.getRepository(Schedule).findOneBy({id: date.time_id});
            const day = time?.date;
            const hour = time?.initial_hour;
            const consultation_reason = await database.getRepository(ConsultationReason).findOneBy({id: date.id_consultation_reason});
            const consultationReason = consultation_reason?.name;
            const consultationReasonDescription = consultation_reason?.description;   
            data.push({
                date: date,
                patientName: patient.name,
                patientLastname: patient.lastname,
                medicName: medicName,
                medicLastName: medicLastname,
                day : day as string,
                hour : hour as string,
                consultationReason : consultationReason as string,
                consultationReasonDescription : consultationReasonDescription as string
            });
        }
        return data;
    }

    async getByIdDoctor(officer_id: Id, query?: Query): Promise<{ date: Date, patientName: string, patientLastname: string, medicName: string, medicLastName: string, day: string, hour: string, consultationReason: string, consultationReasonDescription: string }[]> {
        const repository = database.getRepository(Date);
        const dates = await repository.find({where: {officer_id: officer_id as any}});
        if (!dates) {
            throw new Error('Date not found');
        }

        const medic = await database.getRepository(Employee).findOneBy({id: officer_id as any});
        if (!medic) {
            throw new Error('Medic not found');
        }
        const data: { date: Date, patientName: string, patientLastname: string, medicName: string, medicLastName: string, day: string, hour: string, consultationReason: string, consultationReasonDescription: string }[] = [];

        for (const date of dates) {
            const patient = await database.getRepository(Patient).findOneBy({ id: date.patient_id });
            const patientName = patient ? patient.name : 'Unknown Patient';
            const patientLastname = patient ? patient.lastname : '';
            const time = await database.getRepository(Schedule).findOneBy({id: date.time_id});
            const day = time?.date;
            const hour = time?.initial_hour;
            const consultation_reason = await database.getRepository(ConsultationReason).findOneBy({id: date.id_consultation_reason});
            const consultationReason = consultation_reason?.name;
            const consultationReasonDescription = consultation_reason?.description;  
            data.push({
                date: date,
                patientName: patientName,
                patientLastname: patientLastname,
                medicName: medic?.name || 'Unknown Medic',
                medicLastName: medic?.lastname || '',
                day : day as string,
                hour : hour as string,
                consultationReason : consultationReason as string,
                consultationReasonDescription : consultationReasonDescription as string
            });
        }
        return data;
    }

    async getDatesByStatus(status: string, query?: Query): Promise<Date[]> {
        const repository = database.getRepository(Date);
        const dates = await repository.find({where: {status}});
        if (!dates) {
            throw new Error('Date not found');
        }
        return dates;
    }

    async getData(id: Id, query?: Query): Promise<{ date: Date, patientName: string, patientLastname: string, medicName: string, medicLastName: string, day: string, hour: string, consultationReason: string, consultationReasonDescription: string }> {
        const repository = database.getRepository(Date);
        const date = await repository.findOneBy({id: id as any});
        if (!date) {
            throw new Error('Date not found');
        }
    
        const patient = await database.getRepository(Patient).findOneBy({id: date.patient_id as any});
        if (!patient) {
            throw new Error('Patient not found');
        }
    
        const medic = await database.getRepository(Employee).findOneBy({ id: date.officer_id });
        const medicName = medic ? medic.name : 'Unknown Medic';
        const medicLastname = medic ? medic.lastname : '';
    
        const time = await database.getRepository(Schedule).findOneBy({id: date.time_id});
        const day = time?.date || '';
        const hour = time?.initial_hour || '';
    
        const consultation_reason = await database.getRepository(ConsultationReason).findOneBy({id: date.id_consultation_reason});
        const consultationReason = consultation_reason?.name || '';
        const consultationReasonDescription = consultation_reason?.description || ''; 
    
        const data = {
            date: date,
            patientName: patient.name,
            patientLastname: patient.lastname,
            medicName: medicName,
            medicLastName: medicLastname,
            day: day,
            hour: hour,
            consultationReason: consultationReason,
            consultationReasonDescription: consultationReasonDescription
        };
    
        return data;
    }


    private async sendEmail(date: Date, action: 'creada' | 'actualizada') {
        const patientRepository = database.getRepository(Patient);
        const patient = await patientRepository.findOneBy({ id: date.patient_id });

        const employeeRepository = database.getRepository(Employee);
        const medic = await employeeRepository.findOneBy({ id: date.officer_id });

        const time = await database.getRepository(Schedule).findOneBy({id: date.time_id});

        const mailOptions = {
            from: 'ssoporte.medico42@gmail.com',
            to: patient?.email, 
            subject: `Cita ${action}`,
            text: `Tu cita ha sido ${action}. Detalles: \n\n
                   Fecha: ${time?.date}\n
                   Hora: ${time?.initial_hour}\n
                   Medico: ${medic?.name} ${medic?.lastname}\n
                   Paciente: ${patient?.name} ${patient?.lastname}`
        };

        await transporter.sendMail(mailOptions);
    }
}