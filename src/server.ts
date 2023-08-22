import { DataSource } from "typeorm";
import express from "express";
import "reflect-metadata";
import { Request, Response, NextFunction } from 'express';

// Importing the route modules
import truckRoutes from './routes/truckRoutes';
import employeeRoutes from './routes/employeeRoutes';
import customerRoutes from './routes/customerRoutes';
import shipmentRoutes from './routes/shipmentRoutes';
import repairRoutes from './routes/repairRoutes';
import trucktripRoutes from './routes/trucktripRoutes';

export const app = express();
const port = 3000;

app.use(express.json());  // Using express's built-in middleware

const isTestEnvironment = process.env.NODE_ENV === "test";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "password",
    database: isTestEnvironment ? "test_roadfreight" : "roadfreight",
    entities: [__dirname + "/entity/*.ts"],
    synchronize: true
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        // Using the routes with the app
        app.use('/trucks', truckRoutes);
        app.use('/employees', employeeRoutes);
        app.use('/customers', customerRoutes);
        app.use('/shipments', shipmentRoutes);
        app.use('/repairs', repairRoutes);
        app.use('/truck-trips', trucktripRoutes);

        // Error handling middleware
        app.use((err: Error, req: Request, res: Response, next:NextFunction): void => {
            console.error(err.stack);
            res.status(500).send('Something went wrong!');
        });

        app.listen(port, () => {
            console.log(`Server started on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
