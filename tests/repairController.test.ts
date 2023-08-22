import request from 'supertest';
import { AppDataSource, app } from '../src/server';

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await AppDataSource.initialize();
});

describe('Repair Controller', () => {
    // Happy Path
    it('should create a new repair', async () => {
        const repairData = {
            truck: { truckId: 1 },
            mechanic: { employeeId: 10},
            estimatedRepairTimeInDays: 5
        };
        const response = await request(app).post('/repairs').send(repairData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should create a new repair', async () => {
        const repairData = {
            truck: { truckId: 2 },
            mechanic: { employeeId: 5},
            estimatedRepairTimeInDays: 7
        };
        const response = await request(app).post('/repairs').send(repairData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });


    // Negative Test
    it('should not find a non-existing repair', async () => {
        const response = await request(app).get('/repairs/99999');
        expect(response.status).toBe(404);
        expect(response.text).toBe('Repair not found');
    });

    // Update Test
    it('should update an existing repair', async () => {
        const repairData = {
            estimatedRepairTimeInDays: 8
        };
        const response = await request(app).put('/repairs/1').send(repairData); // Assuming ID 1 exists
        expect(response.status).toBe(200);
        expect(response.body.estimatedRepairTimeInDays).toBe(4);
    });

    // Update Negative Test
    it('should not update a non-existing repair', async () => {
        const repairData = {
            estimatedRepairTimeInDays: 4
        };
        const response = await request(app).put('/repairs/99999').send(repairData);
        expect(response.status).toBe(404);
        expect(response.text).toBe('Repair not found');
    });

    // Delete Test
    it('should delete an existing repair', async () => {
        const response = await request(app).delete('/repairs/1'); // Assuming ID 1 exists
        expect(response.status).toBe(200);
        expect(response.text).toBe('Deleted successfully');
    });

    // Delete Negative Test
    it('should not delete a non-existing repair', async () => {
        const response = await request(app).delete('/repairs/99999');
        expect(response.status).toBe(404);
        expect(response.text).toBe('Repair not found');
    });
});
