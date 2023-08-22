import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export abstract class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    surname: string;

    @Column('int')
    seniority: number;

    @Column({ type: 'varchar', nullable: true })
    type?: string; // This will be manually set to differentiate between different subclasses

}
