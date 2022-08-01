import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDalService } from 'src/data-access/dal/user.dal';
import { User } from 'src/data-access/entities/user.entity';
import { UserController } from 'src/routers/controllers/user/user.controller';
import { UserService } from 'src/services/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserDalService],
})
export class UserModule {}
