import { Request, Response } from "express";
import { TruckTrip } from "../../src/entity/TruckTrip";
import { AppDataSource } from "../server";

// Get all truck trips
export const getAllTruckTrips = async (req: Request, res: Response) => {
    const truckTripRepository = AppDataSource.getRepository(TruckTrip);
    const truckTrips = await truckTripRepository.find();
    res.json(truckTrips);
};

// Get a single truck trip by ID
export const getTruckTripById = async (req: Request, res: Response) => {
    const truckTripRepository = AppDataSource.getRepository(TruckTrip);
    const id = Number(req.params.id);
    const truckTrip = await truckTripRepository.findOne({ where: { id: id } });
    if (truckTrip) {
        res.json(truckTrip);
    } else {
        res.status(404).send("Truck trip not found");
    }
};

// Create a new truck trip
export const createTruckTrip = async (req: Request, res: Response) => {
    const truckTripRepository = AppDataSource.getRepository(TruckTrip);
    const truckTrip = truckTripRepository.create(req.body);
    const results = await truckTripRepository.save(truckTrip);
    res.status(201).send(results);
};

// Update a truck trip
export const updateTruckTrip = async (req: Request, res: Response) => {
    const truckTripRepository = AppDataSource.getRepository(TruckTrip);
    const id = Number(req.params.id);
    const truckTrip = await truckTripRepository.findOne({ where: { id: id } });
    if (truckTrip) {
        truckTripRepository.merge(truckTrip, req.body);
        const results = await truckTripRepository.save(truckTrip);
        res.json(results);
    } else {
        res.status(404).send("Truck trip not found");
    }
};

// Delete a truck trip
export const deleteTruckTrip = async (req: Request, res: Response) => {
    const truckTripRepository = AppDataSource.getRepository(TruckTrip);
    const result = await truckTripRepository.delete(req.params.id);
    if (result.affected === 1) {
        res.status(200).send("Deleted successfully");
    } else {
        res.status(404).send("Truck trip not found");
    }
};
