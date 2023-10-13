import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization?.replace('Bearer ', '') as string;
  const secret = process.env.JWT_SECRET as string;
  try {
    if (authorization) {
      jwt.verify(authorization, secret);
      const user = jwt.decode(authorization) as JwtPayload;
      req.id = user.id;
      req.username = user.username;
      return next();
    } else {
      return res.status(401).json({
        error:
          'O cabeçalho de autorização está vazio ou inválido, você precisa logar para fazer isso.',
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
