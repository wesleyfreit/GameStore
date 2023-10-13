import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { User } from '../models/User';

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization?.replace('Bearer ', '') as string;
  const secret = process.env.JWT_SECRET as string;

  try {
    if (authorization) {
      jwt.verify(authorization, secret);
      const user = jwt.decode(authorization) as JwtPayload;
      if (user.id) {
        const admin = await User.findUnique({ where: { id: user.id } });
        if (admin?.isAdmin) {
          req.id = admin.id;
          return next();
        } else return res.status(404).send('Content not found');
      }
    } else {
      return res.status(404).send('Content not found');
    }
  } catch (error) {
    return res.status(404).send('Content not found');
  }
};
