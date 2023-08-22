import { Request, Response } from "express";
import { Truck } from "../../src/entity/Truck";
import { AppDataSource } from "../server"; // Adjust the path if necessary

// Get all trucks
export const getAllTrucks = async (req: Request, res: Response) => {
    const truckRepository = AppDataSource.getRepository(Truck);
    const trucks = await truckRepository.find();
    res.json(trucks);
};

// Get a single truck by ID
export const getTruckById = async (req: Request, res: Response) => {
    const truckRepository = AppDataSource.getRepository(Truck);
    const id = Number(req.params.id);
    const truck = await truckRepository.findOne({where: { id: id } });
    if (truck) {
        res.json(truck);
    } else {
        res.status(404).send("Truck not found");
    }
};

// Create a new truck
export const createTruck = async (req: Request, res: Response) => {
    const truckRepository = AppDataSource.getRepository(Truck);

    //validate the request for creating truck

    if (!req.body.brand) {
        return res.status(400).json({ errors: [{ msg: 'Brand is required' }] });
    }
    
    const truck = truckRepository.create(req.body);
    const results = await truckRepository.save(truck);
    res.status(201).send(results);
};

// Update a truck
export const updateTruck = async (req: Request, res: Response) => {
    const truckRepository = AppDataSource.getRepository(Truck);
    const id = Number(req.params.id);
    const truck = await truckRepository.findOne({where: { id: id } });
    if (truck) {
        truckRepository.merge(truck, req.body);
        const results = await truckRepository.save(truck);
        res.json(results);
    } else {
        res.status(404).send("Truck not found");
    }
};

// Delete a truck
export const deleteTruck = async (req: Request, res: Response) => {
    const truckRepository = AppDataSource.getRepository(Truck);
    const truck = await truckRepository.delete(req.params.id);
    if (truck.affected === 1) {
        res.status(200).send("Deleted successfully");
    } else {
        res.status(404).send("Truck not found");
    }
};
