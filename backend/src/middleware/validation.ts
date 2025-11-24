import { celebrate, Joi, Segments } from 'celebrate';

const productSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }).required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required().allow(null),
});

export const validateNewProduct = celebrate({
  [Segments.BODY]: productSchema,
});

const orderSchema = Joi.object({
  payment: Joi.string().valid('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+7\d{10}$/).message('Введите номер телефона в формате +79991234567').required(),
  address: Joi.string().required(),
  total: Joi.number().required().min(0),
  items: Joi.array().items(Joi.string().length(24).pattern(/^[a-f0-9]{24}$/)).min(1)
    .required(),
});

export const validateOrder = celebrate({
  [Segments.BODY]: orderSchema,
});
