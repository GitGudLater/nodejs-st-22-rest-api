import { Logger } from '@nestjs/common';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(`HTTP`);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug(`requested path ${req.url} with method ${req.method}`);
    next();
  }
}
