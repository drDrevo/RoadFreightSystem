import request from 'supertest';
import { AppDataSource, app } from '../src/server'; // Adjust the path based on your project structure


beforeAll(async () => {
  process.env.NODE_ENV = 'test'; // Set environment to test
  await AppDataSource.initialize();

});

describe('Truck Controller', () => {
  // Happy Path
  it('should create a new truck', async () => {
    const truckData = {
      brand: 'Audi',
      load: 4000,
      capacity: 11000,
      year: 2013,
      numberOfRepairs: 1
    };
    const response = await request(app).post('/trucks').send(truckData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Edge Case
  it('should not create a truck without a brand', async () => {
    const truckData = {
      load: 6000,
      capacity: 12000,
      year: 2023,
      numberOfRepairs: 3
    };
    const response = await request(app).post('/trucks').send(truckData);
    expect(response.status).toBe(400);
    expect(response.body.errors).toContainEqual(expect.objectContaining({
      msg: 'Brand is required'
    }));
  });

  // Negative Test
  it('should not find a non-existing truck', async () => {
    const response = await request(app).get('/trucks/99999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Truck not found');
  });

  // ... more test cases ...
});
