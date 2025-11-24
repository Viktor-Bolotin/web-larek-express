import express from 'express';
import { validateOrder } from '../middleware/validation';
import createOrder from '../controllers/controllerOrder';

const router = express.Router();

router.post('/', validateOrder, createOrder);

export default router;
