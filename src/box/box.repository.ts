import { DatabaseRepository, Id, Query } from "../declarations";
import { Box} from "./entities/box";
import database from "../config/db";

export class BoxRepository implements DatabaseRepository<Box>{
    async create(data: Partial<Box>, query?: Query): Promise<Box> {
        const repository = database.getRepository(Box); 
        const box = repository.create(data);
        await repository.save(box);
        return box;
    }

    async list(query?: Query): Promise<Box[]> {
        const repository = database.getRepository(Box);
        return repository.find();
    }

    async get(id: Id, query?: Query): Promise<Box> {
        const repository = database.getRepository(Box);
        const box = await repository.findOneBy({id: id as any});
        if (!box) {
            throw new Error('Branch not found');
        }
        return box;
    }

    async update(id: Id, data: Box, query?: Query): Promise<Box> {
        const repository = database.getRepository(Box);
        const box = await repository.update(id, data);
        if (!box) {
            throw new Error('Branch not found');
        }
        return this.get(id, query);
    }

    async remove(id: Id, query?: Query): Promise<Box> {
        const repository = database.getRepository(Box);
        const box = await this.get(id, query);
        if (!box) {
            throw new Error('Branch not found');
        }
        await repository.remove(box);
        return box;
    }
}