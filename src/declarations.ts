export type Query = Record<string, any>;
export type Id = string | number;
export interface DatabaseRepository<T> {
    create(data: Partial<T>, query?: Query): Promise<T>;
    list(query?: Query): Promise<T[]>;
    get(Id: Id, query?: Query): Promise<T>;
    update(Id: Id, data: T, query?: Query): Promise<T>;
    remove(Id: Id, query?: Query): Promise<T>;
}
