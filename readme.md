-------------------------------------------------------------------RoadFreightService----------------------------------------------------------------------------------------------

-------------------------description-------------------------------

This project acts as a system for managing logistics for a variety of entities such as trucks employees customers shipments truck trips and repairs. It offers a thorough management and monitoring system for managing and tracking vehicle maintenance shipment deliveries and employee assignments. It integrates with a PostgreSQL database to store and retrieve data and is built with Node.js on the backend. Each entity's CRUD activities are supported by the system and validations are in place to guarantee data integrity. To guarantee functionality remains constant throughout development the project also contains thorough testing using Jest.


  
  
--------------------------Features---------------------------

Here're some of the project's best features:

*   Truck Management
*   Employee Management
*   Customer Management
*   Shipment Management
*   Detailed Documentation

----------------------Installation Steps:---------------------------
1. Prequisites

```
1. Docker and Docker Compose
2. Node.js required for this project to run on the environment
```

------------------------Setup Instructions-----------------------------------

1. Unpack the archive

```
unzip RoadFreight
```

2. Navigate to the project directory:

```
cd RoadFreight
```

3. Start the Docker containers:

```
docker-compose up -d
```

4. Install Node.js dependencies:

```
npm install
```

7. Run the project:

```
npm start
```

--------------------------------------------------- For Testing------------------------------------------------------------------

1. Run the tests:

```
for Integration testing that tests all controllers:

npm test
  or
  
npm jest
```
for perticular unit test controller : 

npx jest ['test-script file name' ]

example  >  npx jest truckController.test.ts
  
------------------------------------- Built with---------------------------------------------------------

Technologies used in the project:

*   Typescript
*   TypeORM
*   PostgreSQL with PgAdmin
*   nodeJS


-------------------------------------------------note=----------------------------------------------------
 I  created a env database for testing and main database seprate so . while npm start will run the environment database for testing right now because i config
the "server.ts" file in database: with => [ database: isTestEnvironment ? "test_roadfreight" : "roadfreight", ]
> You can change this to main database by  changing it to => [ database: "roadfreight",]

>>>>Some test will failed because i added the delettion testing in script that already deleted the data by id that will now can not be exist.