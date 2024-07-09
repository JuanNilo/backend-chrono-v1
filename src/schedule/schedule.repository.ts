import { DatabaseRepository, Query, Id } from "../declarations";
import { Schedule } from "./entities/schedule";
import database from "../config/db";

export class ScheduleRepository implements DatabaseRepository<Schedule>{
    async create(data: Partial<Schedule>, query?: Query): Promise<Schedule> {
        const repository = database.getRepository(Schedule);
        const scheduleSearch = await repository.findOneBy({ id_box: data.id_box as any, date: data.date, initial_hour: data.initial_hour, final_hour: data.final_hour });
        if (scheduleSearch) {
            throw new Error('Schedule already exists');
        }
        const schedule = repository.create(data);
        await repository.save(schedule);
        return schedule;
    }

    async list(query?: Query): Promise<Schedule[]> {
        const repository = database.getRepository(Schedule);
        return repository.find();
    }

    async get(id: Id, query?: Query): Promise<Schedule> {
        const repository = database.getRepository(Schedule);
        const schedule = await repository.findOneBy({ id: id as any });
        if (!schedule) {
            throw new Error('Schedule not found');
        }
        return schedule;
    }

    async update(id: Id, data: Schedule, query?: Query): Promise<Schedule> {
        const repository = database.getRepository(Schedule);
        const schedule = await repository.update(id, data);
        if (!schedule) {
            throw new Error('Schedule not found');
        }
        return this.get(id, query);
    }

    async remove(id: Id, query?: Query): Promise<Schedule> {
        const repository = database.getRepository(Schedule);
        const schedule = await this.get(id, query);
        if (!schedule) {
            throw new Error('Schedule not found');
        }
        await repository.remove(schedule);
        return schedule;
    }

    async getScheduleByDate(date: string): Promise<Schedule[]> {
        const repository = database.getRepository(Schedule);
        return repository.findBy({ date: date as any });
    }
    
    async getScheduleByEmployee(id_employee: Id, date: string): Promise<Schedule[]> {
        const repository = database.getRepository(Schedule);
        return repository.findBy({
            id_employee: id_employee as any,
            date: date,
            state: true
        });
    }

    async getScheduleByState(state: string): Promise<Schedule[]> {
        const booleanState = state.toLowerCase() === 'true';
        const repository = database.getRepository(Schedule);
        return repository.findBy({ state: booleanState as any });
    }
}