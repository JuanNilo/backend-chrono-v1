import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Box {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

}