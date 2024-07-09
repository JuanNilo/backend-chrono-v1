import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Patient {

    @PrimaryGeneratedColumn()
    id: number;

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
    category: string;

}