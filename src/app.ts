import express from 'express';
import compression from 'compression';
import ErrorMiddleware from './middlewares/error.middleware';
import { productRouter, userRouter } from './routers';
import CacheMiddleware from './middlewares/cache.middleware';

const errorMiddleware = new ErrorMiddleware();

const cacheMiddleware = new CacheMiddleware();

const app = express();

app.use(express.json());

app.use(compression());

app.use(cacheMiddleware.setCache);

app.use('/products', productRouter);

app.use('/users', userRouter);

app.use(errorMiddleware.error);

export default app;
