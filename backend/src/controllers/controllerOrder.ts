import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import ProductModel from '../models/product';
import BadRequestError from '../errors/badRequestError';

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { total, items } = req.body;

  const products = await ProductModel.find({ _id: { $in: items } });
  if (products.length < items.length) {
    return next(new BadRequestError('Один или несколько товаров отсутствуют в каталоге'));
  }

  let countTotal = 0;

  products.forEach((product) => {
    if (product.price == null) {
      return next(
        new BadRequestError(`Товар ${product.title} с id ${product._id} отсутствует в продаже`),
      );
    }
    countTotal += product.price;
    return countTotal;
  });

  if (countTotal !== total) {
    return next(
      new BadRequestError(
        `Некорректная сумма total, ожидаемая сумма ${countTotal}`,
      ),
    );
  }

  const orderId = faker.string.uuid();
  return res.status(200).send({
    id: orderId,
    total: countTotal,
  });
};

export default createOrder;
