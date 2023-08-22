import { Request, Response } from "express";
import { Repair } from "../../src/entity/Repair";
import { AppDataSource } from "../server";

// Get all repairs
export const getAllRepairs = async (req: Request, res: Response) => {
    const repairRepository = AppDataSource.getRepository(Repair);
    const repairs = await repairRepository.find();
    res.json(repairs);
};

// Get a single repair by ID
export const getRepairById = async (req: Request, res: Response) => {
    const repairRepository = AppDataSource.getRepository(Repair);
    const id = Number(req.params.id);
    const repair = await repairRepository.findOne({ where: { id: id } });
    if (repair) {
        res.json(repair);
    } else {
        res.status(404).send("Repair not found");
    }
};

// Create a new repair
export const createRepair = async (req: Request, res: Response) => {
    const repairRepository = AppDataSource.getRepository(Repair);
    const repair = repairRepository.create(req.body);
    const results = await repairRepository.save(repair);
    res.status(201).send(results);
};

// Update a repair
export const updateRepair = async (req: Request, res: Response) => {
    const repairRepository = AppDataSource.getRepository(Repair);
    const id = Number(req.params.id);
    const repair = await repairRepository.findOne({ where: { id: id } });
    if (repair) {
        repairRepository.merge(repair, req.body);
        const results = await repairRepository.save(repair);
        res.json(results);
    } else {
        res.status(404).send("Repair not found");
    }
};

// Delete a repair
export const deleteRepair = async (req: Request, res: Response) => {
    const repairRepository = AppDataSource.getRepository(Repair);
    const result = await repairRepository.delete(req.params.id);
    if (result.affected === 1) {
        res.status(200).send("Deleted successfully");
    } else {
        res.status(404).send("Repair not found");
    }
};
