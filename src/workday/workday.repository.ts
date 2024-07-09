import { DatabaseRepository, Id, Query } from "../declarations";
import { Workday } from "./entities/workday";
import database from "../config/db";

export class WorkdayRepository implements DatabaseRepository<Workday>{
    async create(data: Partial<Workday>, query?: Query): Promise<Workday> {
        const repository = database.getRepository(Workday);
        const workday = repository.create(data);
        await repository.save(workday);
        return workday;
    }

    async list(query?: Query): Promise<Workday[]> {
        const repository = database.getRepository(Workday);
        return repository.find();
    }

    async get(id: Id, query?: Query): Promise<Workday> {
        const repository = database.getRepository(Workday);
        const workday = await repository.findOneBy({ id: id as any });
        if (!workday) {
            throw new Error('Workday not found');
        }
        return workday;
    }

    async update(id: Id, data: Workday, query?: Query): Promise<Workday> {
        const repository = database.getRepository(Workday);
        const workday = await repository.update(id, data);
        if (!workday) {
            throw new Error('Workday not found');
        }
        return this.get(id, query);
    }

    async remove(id: Id, query?: Query): Promise<Workday> {
        const repository = database.getRepository(Workday);
        const workday = await this.get(id, query);
        if (!workday) {
            throw new Error('Workday not found');
        }
        await repository.remove(workday);
        return workday;
    }
}