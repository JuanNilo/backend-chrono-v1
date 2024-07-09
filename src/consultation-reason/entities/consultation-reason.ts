import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ConsultationReason{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
}