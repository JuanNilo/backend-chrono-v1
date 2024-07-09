import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Date {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time_id: number;

    @Column()
    patient_id: number;

    @Column()
    officer_id: number;

    @Column()
    process: string;

    @Column()
    status: string;

    @Column()
    id_consultation_reason: number;

}