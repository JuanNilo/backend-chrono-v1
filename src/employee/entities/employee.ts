import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_speciality: number;

    @Column()
    rut: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    date: string;
}