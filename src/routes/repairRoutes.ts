import express from 'express';
import * as repairController from '../controllers/repairController';

const router = express.Router();

router.get('/', repairController.getAllRepairs);
router.get('/:id', repairController.getRepairById);
router.post('/', repairController.createRepair);
router.put('/:id', repairController.updateRepair);
router.delete('/:id', repairController.deleteRepair);

export default router;
