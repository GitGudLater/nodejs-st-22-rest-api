import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDalService } from 'src/data-access/dal/user.dal';
import { User } from 'src/data-access/entities/user.entity';
import { ServiceLogger } from 'src/middleware/service.logger';
import { UserController } from 'src/routers/controllers/user/user.controller';
import { UserService } from 'src/services/user/user.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule],
  controllers: [UserController],
  providers: [UserService, UserDalService, ServiceLogger],
})
export class UserModule {}
