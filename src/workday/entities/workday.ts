import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Workday{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    id_schedule: number;
}