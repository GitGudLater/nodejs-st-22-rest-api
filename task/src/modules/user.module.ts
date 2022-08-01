import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { UserDalService } from 'src/db/dal/user.dal';
import { UserService } from 'src/services/user/user.service';
import { UserController } from 'src/controllers/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserDalService],
})
export class UserModule {}
