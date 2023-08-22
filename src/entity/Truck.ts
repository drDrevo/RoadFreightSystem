import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Truck {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    brand: string;

    @Column('int')
    load: number;

    @Column('int')
    capacity: number;

    @Column('int')
    year: number;

    @Column('int')
    numberOfRepairs: number;
}
