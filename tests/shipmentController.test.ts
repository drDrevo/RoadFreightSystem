import request from 'supertest';
import { AppDataSource, app } from '../src/server';

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await AppDataSource.initialize();
});

describe('Shipment Controller', () => {
  // Happy Path
  it('should create a new shipment', async () => {
    const shipmentData = {
      weight: 1000,
      value: 5000,
      origin: 'New York',
      destination: 'Los Angeles'
    };
    const response = await request(app).post('/shipments').send(shipmentData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should create a new shipment', async () => {
    const shipmentData = {
      weight: 1000,
      value: 5000,
      origin: 'Waterloo',
      destination: 'Kitchner'
    };
    const response = await request(app).post('/shipments').send(shipmentData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });


  // Edge Case
  it('should not create a shipment without a destination', async () => {
    const shipmentData = {
      weight: 1000,
      value: 5000,
      origin: 'New York'
    };
    const response = await request(app).post('/shipments').send(shipmentData);
    expect(response.status).toBe(400);
    expect(response.body.errors).toContainEqual(expect.objectContaining({
      msg: 'Destination is required'
    }));
  });

  // Negative Test
  it('should not find a non-existing shipment', async () => {
    const response = await request(app).get('/shipments/99999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Shipment not found');
  });
  it('should update an existing shipment', async () => {
    // Assuming you've already created a shipment with id = 1 (this would need to be adjusted)
    const updatedShipmentData = {
      weight: 1200,
      value: 6000,
      origin: 'Waterloo',
      destination: 'Torronto'
    };
    const response = await request(app).put('/shipments/1').send(updatedShipmentData);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedShipmentData);
  });

  // Delete Test
  it('should delete a shipment', async () => {
    // Assuming you have a shipment with id = 2 (this would need to be adjusted)
    const response = await request(app).delete('/shipments/2');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Deleted successfully');
  });

  // Negative Test for Delete
  it('should not delete a non-existing shipment', async () => {
    const response = await request(app).delete('/shipments/99999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Shipment not found');
  });

  
});
