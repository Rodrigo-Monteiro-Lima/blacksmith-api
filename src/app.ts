import express from 'express';
import compression from 'compression';
import ErrorMiddleware from './middlewares/error.middleware';
import productRouter from './routers/product.route';

const errorMiddleware = new ErrorMiddleware();

const app = express();

app.use(express.json());

app.use(compression());

app.use('/products', productRouter);

app.use(errorMiddleware.error);

export default app;
