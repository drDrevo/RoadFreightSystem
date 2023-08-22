import { Entity, Column, BeforeInsert } from "typeorm";
import { Employee } from "./Employee";

@Entity()
export class Mechanic extends Employee {
    @Column('text')
    brandSpecialization: string;

    @BeforeInsert()
    setType() {
        this.type = 'Mechanic';
    }
}
