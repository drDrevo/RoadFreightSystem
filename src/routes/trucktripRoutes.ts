import express from 'express';
import * as trucktripController from '../controllers/trucktripController';

const router = express.Router();

router.get('/', trucktripController.getAllTruckTrips);
router.get('/:id', trucktripController.getTruckTripById);
router.post('/', trucktripController.createTruckTrip);
router.put('/:id', trucktripController.updateTruckTrip);
router.delete('/:id', trucktripController.deleteTruckTrip);

export default router;
