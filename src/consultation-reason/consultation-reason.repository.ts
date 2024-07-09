import { DatabaseRepository, Id, Query } from "../declarations";
import { ConsultationReason } from "./entities/consultation-reason";
import database from "../config/db";

export class ConsultationReasonRepository implements DatabaseRepository<ConsultationReason>{
    async create(data: Partial<ConsultationReason>, query?: Query): Promise<ConsultationReason> {
        const repository = database.getRepository(ConsultationReason);
        const consultation_reason = repository.create(data);
        await repository.save(consultation_reason);
        return consultation_reason;
    }

    async list(query?: Query): Promise<ConsultationReason[]> {
        const repository = database.getRepository(ConsultationReason);
        return repository.find();
    }

    async get(id: Id, query?: Query): Promise<ConsultationReason> {
        const repository = database.getRepository(ConsultationReason);
        const consultation_reason = await repository.findOneBy({ id: id as any });
        if (!consultation_reason) {
            throw new Error('Speciality not found');
        }
        return consultation_reason;
    }

    async update(id: Id, data: ConsultationReason, query?: Query): Promise<ConsultationReason> {
        const repository = database.getRepository(ConsultationReason);
        const consultation_reason = await repository.update(id, data);
        if (!consultation_reason) {
            throw new Error('Speciality not found');
        }
        return this.get(id, query);
    }

    async remove(id: Id, query?: Query): Promise<ConsultationReason> {
        const repository = database.getRepository(ConsultationReason);
        const consultation_reason = await this.get(id, query);
        if (!consultation_reason) {
            throw new Error('Speciality not found');
        }
        await repository.remove(consultation_reason);
        return consultation_reason;
    }

}