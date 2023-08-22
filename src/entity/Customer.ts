import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    address: string;

    @Column('text')
    phoneNumber1: string;

    @Column('text')
    phoneNumber2: string;
}
