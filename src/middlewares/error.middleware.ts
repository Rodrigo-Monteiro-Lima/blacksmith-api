import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../utils/statusCodes';

export default class ErrorMiddleware {
  error = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    const { status, message } = err as any;
    return res.status(status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  };
}
