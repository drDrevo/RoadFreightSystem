import { Entity, Column, BeforeInsert } from "typeorm";
import { Employee } from "./Employee";

@Entity()
export class Driver extends Employee {
    @Column('text')
    category: string;

    @BeforeInsert()
    setType() {
        this.type = 'Driver';
    }
}
