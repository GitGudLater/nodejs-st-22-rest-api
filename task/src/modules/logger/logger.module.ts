import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { ServiceLogger } from 'src/middleware/service.logger';
import { GroupController } from 'src/routers/controllers/group/group.controller';
import { UserController } from 'src/routers/controllers/user/user.controller';

@Module({
  providers: [ServiceLogger],
  exports: [ServiceLogger],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController, GroupController);
  }
}
