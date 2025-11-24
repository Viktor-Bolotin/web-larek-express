import express from 'express';
import { validateNewProduct } from '../middleware/validation';
import { createProduct, getProducts } from '../controllers/controllerProduct';

const router = express.Router();

router.get('/', getProducts);

router.post('/', validateNewProduct, createProduct);

export default router;
