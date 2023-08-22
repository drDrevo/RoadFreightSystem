import { Request, Response } from "express";
import { Shipment } from "../../src/entity/Shipment";
import { AppDataSource } from "../server";

// Get all shipments
export const getAllShipments = async (req: Request, res: Response) => {
    const shipmentRepository = AppDataSource.getRepository(Shipment);
    const shipments = await shipmentRepository.find();
    res.json(shipments);
};

// Get a single shipment by ID
export const getShipmentById = async (req: Request, res: Response) => {
    const shipmentRepository = AppDataSource.getRepository(Shipment);
    const id = Number(req.params.id);
    const shipment = await shipmentRepository.findOne({ where: { id: id } });
    if (shipment) {
        res.json(shipment);
    } else {
        res.status(404).send("Shipment not found");
    }
};

// Create a new shipment
export const createShipment = async (req: Request, res: Response) => {
    const shipmentRepository = AppDataSource.getRepository(Shipment);
    // Check for destination
    if (!req.body.destination) {
        return res.status(400).send({ errors: [{ msg: 'Destination is required' }] });
    }
    const shipment = shipmentRepository.create(req.body);
    const results = await shipmentRepository.save(shipment);
    res.status(201).send(results);
};

// Update a shipment
export const updateShipment = async (req: Request, res: Response) => {
    const shipmentRepository = AppDataSource.getRepository(Shipment);
    const id = Number(req.params.id);
    const shipment = await shipmentRepository.findOne({ where: { id: id } });
    if (shipment) {
        shipmentRepository.merge(shipment, req.body);
        const results = await shipmentRepository.save(shipment);
        res.json(results);
    } else {
        res.status(404).send("Shipment not found");
    }
};

// Delete a shipment
export const deleteShipment = async (req: Request, res: Response) => {
    const shipmentRepository = AppDataSource.getRepository(Shipment);
    const result = await shipmentRepository.delete(req.params.id);
    if (result.affected === 1) {
        res.status(200).send("Deleted successfully");
    } else {
        res.status(404).send("Shipment not found");
    }
};
