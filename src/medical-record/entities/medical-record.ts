import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MedicalRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_patient: number;

    @Column()
    id_employee: number;

    @Column()
    date: string;

    @Column()
    diagnostic: string;

    @Column()
    treatment: string;

    @Column()
    medicine: string;

    @Column()
    id_date: number;
}