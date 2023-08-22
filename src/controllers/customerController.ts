import { Request, Response } from "express";
import { Customer } from "../../src/entity/Customer";
import { AppDataSource } from "../server";

// Get all customers
export const getAllCustomers = async (req: Request, res: Response) => {
    const customerRepository = AppDataSource.getRepository(Customer);
    const customers = await customerRepository.find();
    res.json(customers);
};

// Get a single customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
    const customerRepository = AppDataSource.getRepository(Customer);
    const id = Number(req.params.id);
    const customer = await customerRepository.findOne({ where: { id: id } });
    if (customer) {
        res.json(customer);
    } else {
        res.status(404).send("Customer not found");
    }
};

// Create a new customer
export const createCustomer = async (req: Request, res: Response) => {
    const customerRepository = AppDataSource.getRepository(Customer);
    const customer = customerRepository.create(req.body);
    const results = await customerRepository.save(customer);
    res.status(201).send(results);
};

// Update a customer
export const updateCustomer = async (req: Request, res: Response) => {
    const customerRepository = AppDataSource.getRepository(Customer);
    const id = Number(req.params.id);
    const customer = await customerRepository.findOne({ where: { id: id } });
    if (customer) {
        customerRepository.merge(customer, req.body);
        const results = await customerRepository.save(customer);
        res.json(results);
    } else {
        res.status(404).send("Customer not found");
    }
};

// Delete a customer
export const deleteCustomer = async (req: Request, res: Response) => {
    const customerRepository = AppDataSource.getRepository(Customer);
    const result = await customerRepository.delete(req.params.id);
    if (result.affected === 1) {
        res.status(200).send("Deleted successfully");
    } else {
        res.status(404).send("Customer not found");
    }
};
