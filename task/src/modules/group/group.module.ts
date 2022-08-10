import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupDalService } from 'src/data-access/dal/group.dal';
import { UsersToGroupsDalService } from 'src/data-access/dal/groups-to-users.dal';
import { Group } from 'src/data-access/entities/group.entity';
import { GroupController } from 'src/routers/controllers/group/group.controller';
import { GroupService } from 'src/services/group/group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [GroupService, GroupDalService, UsersToGroupsDalService],
})
export class GroupModule {}