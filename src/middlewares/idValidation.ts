import { NextFunction, Request, Response } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (id.length < 24) {
    return res.status(400)
      .json({ error: 'Id must have 24 hexadecimal characters' });
  }
  return next();
};
