import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';
import ServerError from '../errors/serverError';
import ConflictError from '../errors/conflictError';

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({});
    const data = {
      items: products,
      total: products.length,
    };
    return res.status(200).send(data);
  } catch (err) {
    return next(new ServerError());
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title, image, category, description, price,
  } = req.body;

  try {
    const newProduct = new Product({
      title, image, category, description, price,
    });
    const savedProduct = await newProduct.save();
    return res.status(200).send(savedProduct);
  } catch (err) {
    if (err instanceof Error && err.message.includes('E11000')) {
      return next(new ConflictError('Продукт с таким названием уже существует'));
    }
    return next(new ServerError());
  }
};
