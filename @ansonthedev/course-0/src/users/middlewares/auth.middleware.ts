import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new ForbiddenException('Not authorized');
    }

    if (authorization !== 'SECRET_TOKEN') {
      throw new ForbiddenException('Invalid token');
    }

    next();
  }
}
