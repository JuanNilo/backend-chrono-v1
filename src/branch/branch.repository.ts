import { DatabaseRepository, Id, Query } from "../declarations";
import { Branch } from "./entities/branch";
import database from "../config/db";

export class BranchRepository implements DatabaseRepository<Branch>{
    async create(data: Partial<Branch>, query?: Query): Promise<Branch> {
        const repository = database.getRepository(Branch); 
        const branch = repository.create(data);
        await repository.save(branch);
        return branch;
    }

    async list(query?: Query): Promise<Branch[]> {
        const repository = database.getRepository(Branch);
        return repository.find();
    }

    async get(id: Id, query?: Query): Promise<Branch> {
        const repository = database.getRepository(Branch);
        const branch = await repository.findOneBy({id: id as any});
        if (!branch) {
            throw new Error('Branch not found');
        }
        return branch;
    }

    async update(id: Id, data: Branch, query?: Query): Promise<Branch> {
        const repository = database.getRepository(Branch);
        const branch = await repository.update(id, data);
        if (!branch) {
            throw new Error('Branch not found');
        }
        return this.get(id, query);
    }

    async remove(id: Id, query?: Query): Promise<Branch> {
        const repository = database.getRepository(Branch);
        const branch = await this.get(id, query);
        if (!branch) {
            throw new Error('Branch not found');
        }
        await repository.remove(branch);
        return branch;
    }
}