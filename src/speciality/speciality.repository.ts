import { DatabaseRepository, Id, Query } from "../declarations";
import { Speciality } from "./entities/speciality";
import database from "../config/db";
import { Not } from "typeorm";

export class SpecialityRepository implements DatabaseRepository<Speciality>{
    async create(data: Partial<Speciality>, query?: Query): Promise<Speciality> {
        const repository = database.getRepository(Speciality);
        const speciality = repository.create(data);
        await repository.save(speciality);
        return speciality;
    }

    async list(query?: Query): Promise<Speciality[]> {
        const repository = database.getRepository(Speciality);
        return repository.find();
    }

    async get(id: Id, query?: Query): Promise<Speciality> {
        const repository = database.getRepository(Speciality);
        const speciality = await repository.findOneBy({ id: id as any });
        if (!speciality) {
            throw new Error('Speciality not found');
        }
        return speciality;
    }

    async update(id: Id, data: Speciality, query?: Query): Promise<Speciality> {
        const repository = database.getRepository(Speciality);
        const speciality = await repository.update(id, data);
        if (!speciality) {
            throw new Error('Speciality not found');
        }
        return this.get(id, query);
    }

    async remove(id: Id, query?: Query): Promise<Speciality> {
        const repository = database.getRepository(Speciality);
        const speciality = await this.get(id, query);
        if (!speciality) {
            throw new Error('Speciality not found');
        }
        await repository.remove(speciality);
        return speciality;
    }

    async getAllMedics(query?: Query): Promise<Speciality[]> {
        const repository = database.getRepository(Speciality);
        return repository.find({where: {id: Not(2)}});
    }
}