import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';
import { ServiceLogger } from './middleware/service.logger';

async function bootstrap() {
  dotenv.config({ path: __dirname + '/.env' });
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(new ServiceLogger);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
