import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { TruckTrip } from "./TruckTrip"; 

@Entity()
export class Shipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    weight: number;

    @Column('int')
    value: number;

    @Column('text')
    origin: string;

    @Column('text')
    destination: string;

    @ManyToMany(() => TruckTrip, truckTrip => truckTrip.shipments)
    @JoinTable()
    truckTrips: TruckTrip[];
}
