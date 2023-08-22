import request from 'supertest';
import { AppDataSource, app } from '../src/server';

beforeAll(async () => {
    process.env.NODE_ENV = 'test'; 
    await AppDataSource.initialize();
});

describe('Employee Controller', () => {
    // Happy Path
    it('should create a new employee', async () => {
        const employeeData = {
            name: 'Yadwgaginder',
            surname: 'Gohil',
            seniority: 5,
            type: 'mechanic'
        };
        const response = await request(app).post('/employees').send(employeeData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should create a new employee', async () => {
        const employeeData = {
            name: 'bhinnder',
            surname: 'mil',
            seniority: 3,
            type: 'driver'
        };
        const response = await request(app).post('/employees').send(employeeData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });
    // Edge Case
    it('should create an employee without a type', async () => {
        const employeeData = {
            name: 'bafinder',
            surname: 'Singh',
            seniority: 4
        };
        const response = await request(app).post('/employees').send(employeeData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    // Negative Test
    it('should not find a non-existing employee', async () => {
        const response = await request(app).get('/employees/99999');
        expect(response.status).toBe(404);
        expect(response.text).toBe('Employee not found');
    });

    // Update existing employee
    it('should update an employee', async () => {
        // Assuming you have an employee with id = 1 (this would need to be adjusted)
        const updatedEmployeeData = {
            name: 'roman'
        };
        const response = await request(app).put('/employees/1').send(updatedEmployeeData);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('roman');
    });

    // Attempt to update non-existing employee
    it('should not update a non-existing employee', async () => {
        const updatedEmployeeData = {
            name: 'Chahana ravat'
        };
        const response = await request(app).put('/employees/99999').send(updatedEmployeeData);
        expect(response.status).toBe(404);
        expect(response.text).toBe('Employee not found');
    });

    // Delete an employee
    it('should delete an employee', async () => {
        // Assuming you have an employee with id = 6 (this would need to be adjusted after deleting some value in a test)
        const response = await request(app).delete('/employees/7');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Deleted successfully');
    });

    // Attempt to delete non-existing employee
    it('should not delete a non-existing employee', async () => {
        const response = await request(app).delete('/employees/99999');
        expect(response.status).toBe(404);
        expect(response.text).toBe('Employee not found');
    });
});
