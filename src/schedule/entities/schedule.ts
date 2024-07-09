import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Schedule{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    initial_hour: string;

    @Column()
    final_hour: string;

    @Column()
    id_employee: number;

    @Column()
    date: string;

    @Column()
    state: boolean;

    @Column()
    id_box: number;

}