import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Shipment } from "./Shipment";
import { Truck } from "./Truck";
import { Driver } from "./Driver";

@Entity()
export class TruckTrip {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    routeFrom: string;

    @Column('text')
    routeTo: string;

    @ManyToMany(() => Shipment, shipment => shipment.truckTrips)
    shipments: Shipment[];

    @ManyToOne(() => Truck)
    truck: Truck;

    @ManyToOne(() => Driver)
    driver1: Driver;

    @ManyToOne(() => Driver, { nullable: true })
    driver2?: Driver;
}
