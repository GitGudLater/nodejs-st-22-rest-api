import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';
import { ServiceLogger } from './middleware/service.logger';
import { ExceptionsFilter } from './middleware/exception.filter';

async function bootstrap() {
  dotenv.config({ path: __dirname + '/.env' });
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });
  app.useLogger(new ServiceLogger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
