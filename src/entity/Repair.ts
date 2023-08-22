import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Truck } from "./Truck";
import { Mechanic } from "./Mechanic";

@Entity()
export class Repair {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Truck)
    truck: Truck;

    @ManyToOne(() => Mechanic)
    mechanic: Mechanic;

    @Column('int')
    estimatedRepairTimeInDays: number;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    repairDate: Date;
}
