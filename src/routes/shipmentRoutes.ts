import express from 'express';
import * as shipmentController from '../controllers/shipmentController';

const router = express.Router();

router.get('/', shipmentController.getAllShipments);
router.get('/:id', shipmentController.getShipmentById);
router.post('/', shipmentController.createShipment);
router.put('/:id', shipmentController.updateShipment);
router.delete('/:id', shipmentController.deleteShipment);

export default router;
