import request from 'supertest';
import { AppDataSource, app } from '../src/server';

beforeAll(async () => {
    process.env.NODE_ENV = 'test'; 
    await AppDataSource.initialize();
});

describe('Customer Controller', () => {
    // Happy Path
    it('should create a new customer', async () => {
        const customerData = {
            name: 'ram',
            address: 'Dave',
            phoneNumber1: '5352348823',
            phoneNumber2: '2415535781'
        };
        const response = await request(app).post('/customers').send(customerData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    // Edge Case
    it('should create a customer without a secondary phone number', async () => {
        const customerData = {
            name: 'Yamla',
            address: '456 hell drive',
            phoneNumber1: '642452234'
        };
        const response = await request(app).post('/customers').send(customerData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    // Negative Test
    it('should not find a non-existing customer', async () => {
        const response = await request(app).get('/customers/99999');
        expect(response.status).toBe(404);
        expect(response.text).toBe('Customer not found');
    });

    // Update existing customer
    it('should update a customer', async () => {
        // Assuming you have a customer with id = 1 (this would need to be adjusted)
        const updatedCustomerData = {
            name: 'rohan'
        };
        const response = await request(app).put('/customers/1').send(updatedCustomerData);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('rohan');
    });

    // Attempt to update non-existing customer
    it('should not update a non-existing customer', async () => {
        const updatedCustomerData = {
            name: 'Randy'
        };
        const response = await request(app).put('/customers/99999').send(updatedCustomerData);
        expect(response.status).toBe(404);
        expect(response.text).toBe('Customer not found');
    });

    // Delete a customer
    it('should delete a customer', async () => {
        // Assuming you have a customer with id = 2 (this would need to be adjusted)
        const response = await request(app).delete('/customers/3');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Deleted successfully');
    });

    // Attempt to delete non-existing customer
    it('should not delete a non-existing customer', async () => {
        const response = await request(app).delete('/customers/99999');
        expect(response.status).toBe(404);
        expect(response.text).toBe('Customer not found');
    });
});
