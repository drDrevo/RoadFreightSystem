import { Request, Response } from "express";
import { Employee } from "../../src/entity/Employee";
import { AppDataSource } from "../server";

// Get all employees
export const getAllEmployees = async (req: Request, res: Response) => {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const employees = await employeeRepository.find();
    res.json(employees);
};

// Get a single employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const id = Number(req.params.id);
    const employee = await employeeRepository.findOne({ where: { id: id } });
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).send("Employee not found");
    }
};

// Create a new employee
export const createEmployee = async (req: Request, res: Response) => {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const employee = employeeRepository.create(req.body);
    const results = await employeeRepository.save(employee);
    res.status(201).send(results);
};

// Update an employee
export const updateEmployee = async (req: Request, res: Response) => {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const id = Number(req.params.id);
    const employee = await employeeRepository.findOne({ where: { id: id } });
    if (employee) {
        employeeRepository.merge(employee, req.body);
        const results = await employeeRepository.save(employee);
        res.json(results);
    } else {
        res.status(404).send("Employee not found");
    }
};

// Delete an employee
export const deleteEmployee = async (req: Request, res: Response) => {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const result = await employeeRepository.delete(req.params.id);
    if (result.affected === 1) {
        res.status(200).send("Deleted successfully");
    } else {
        res.status(404).send("Employee not found");
    }
};
