import { NextFunction, Request, Response } from 'express';

export default class CacheMiddleware {
  setCache = (req: Request, res: Response, next: NextFunction) => {
    const period = 60 * 5;
    if (req.method === 'GET') {
      res.set('Cache-control', `public, max-age=${period}`);
    } else {
      res.set('Cache-control', 'no-store');
    }
    next();
  };
}
