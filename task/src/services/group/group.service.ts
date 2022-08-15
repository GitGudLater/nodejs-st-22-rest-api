import { Injectable } from '@nestjs/common';
import { GroupDalService } from 'src/data-access/dal/group.dal';
import { UsersToGroupsDalService } from 'src/data-access/dal/groups-to-users.dal';
import { UserDalService } from 'src/data-access/dal/user.dal';
import { Group } from 'src/data-access/entities/group.entity';
import { GroupDTO } from 'src/interfaces/dto/groupdto';
import { Argument } from 'src/interfaces/models/argument';
import { ServiceLogger } from 'src/middleware/service.logger';
import { UserService } from '../user/user.service';

@Injectable()
export class GroupService {
  constructor(
    private groupDal: GroupDalService,
    private usersGroupsDal: UsersToGroupsDalService,
    private userDal: UserDalService,
    private readonly logger: ServiceLogger = new ServiceLogger(
      UserService.name,
    ),
  ) {}

  addUserToGroup(userId: string, groupId: string) {
    const argsCollection: Argument[] = [];
    argsCollection.push(
      { argumentName: 'userId', value: userId },
      { argumentName: 'groupId', value: groupId },
    );
    this.logger.serviceMethodLog('addUserToGroup', argsCollection);
    this.userDal
      .selectUserById(userId)
      .then((user) => this.usersGroupsDal.addUserToGroup(user, groupId));
  }
  findGroupById(groupId: string): Promise<Group> {
    const argsCollection: Argument[] = [];
    argsCollection.push({ argumentName: 'groupId', value: groupId });
    this.logger.serviceMethodLog('findGroupById', argsCollection);
    return this.groupDal.selectGroupById(groupId);
  }
  getGroups(): Promise<Group[]> {
    this.logger.serviceMethodLog('getGroups', null);
    return this.groupDal.selectGroups();
  }
  addGroup(newGroup: GroupDTO): Group {
    const argsCollection: Argument[] = [];
    argsCollection.push({ argumentName: 'newGroup', value: newGroup });
    this.logger.serviceMethodLog('addGroup', argsCollection);
    const group = {
      ...newGroup,
      id: crypto.randomUUID(),
      isDeleted: false,
    } as Group;
    this.groupDal.insertGroup(group);
    return group;
  }
  deleteGroup(groupId: string) {
    const argsCollection: Argument[] = [];
    argsCollection.push({ argumentName: 'groupId', value: groupId });
    this.logger.serviceMethodLog('deleteGroup', argsCollection);
    this.groupDal.deleteGroup(groupId);
  }
  updateGroup(groupId: string, updatedGroup: GroupDTO): Promise<Group> {
    const argsCollection: Argument[] = [];
    argsCollection.push(
      { argumentName: 'groupId', value: groupId },
      { argumentName: 'updatedGroup', value: updatedGroup },
    );
    this.logger.serviceMethodLog('updateGroup', argsCollection);
    return this.groupDal.updateGroup(groupId, updatedGroup);
  }
}
