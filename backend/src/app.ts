import express from 'express';
import path from 'path';
import { errors as selebrateErrors } from 'celebrate';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import errorHandler from './middleware/errorHandler';
import { errorLogger, requestLogger } from './middleware/logger';

const mongoose = require('mongoose');

require('dotenv').config();
const cors = require('cors');

const { PORT } = process.env;
const { DB_ADDRESS } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'public', 'images')));
app.use(cors());
mongoose.connect(DB_ADDRESS);
app.use(express.json());

app.use(requestLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errorLogger);

app.use(selebrateErrors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost: ${PORT} `);
});

export default app;
