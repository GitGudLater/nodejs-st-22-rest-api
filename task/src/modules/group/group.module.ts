import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupDalService } from 'src/data-access/dal/group.dal';
import { UsersToGroupsDalService } from 'src/data-access/dal/groups-to-users.dal';
import { UserDalService } from 'src/data-access/dal/user.dal';
import { Group } from 'src/data-access/entities/group.entity';
import { User } from 'src/data-access/entities/user.entity';
import { ServiceLogger } from 'src/middleware/service.logger';
import { GroupController } from 'src/routers/controllers/group/group.controller';
import { GroupService } from 'src/services/group/group.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User]), LoggerModule],
  controllers: [GroupController],
  providers: [
    GroupService,
    GroupDalService,
    UsersToGroupsDalService,
    UserDalService,
    ServiceLogger,
  ],
})
export class GroupModule {}