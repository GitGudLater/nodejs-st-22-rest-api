import { Injectable } from '@nestjs/common';
import { GroupDalService } from 'src/data-access/dal/group.dal';
import { UsersToGroupsDalService } from 'src/data-access/dal/groups-to-users.dal';
import { UserDalService } from 'src/data-access/dal/user.dal';
import { Group } from 'src/data-access/entities/group.entity';
import { GroupDTO } from 'src/interfaces/dto/groupdto';

@Injectable()
export class GroupService {
  constructor(
    private groupDal: GroupDalService,
    private usersGroupsDal: UsersToGroupsDalService,
    private userDal: UserDalService,
  ) {}

  addUserToGroup(userId: string, groupId: string) {
    this.userDal
      .selectUserById(userId)
      .then((user) => this.usersGroupsDal.addUserToGroup(user, groupId));
  }
  findGroupById(userId: string): Promise<Group> {
    return this.groupDal.selectGroupById(userId);
  }
  getGroups(): Promise<Group[]> {
    return this.groupDal.selectGroups();
  }
  addGroup(newGroup: GroupDTO): Group {
    const group = {
      ...newGroup,
      id: crypto.randomUUID(),
      isDeleted: false,
    } as Group;
    this.groupDal.insertGroup(group);
    return group;
  }
  deleteGroup(groupId: string) {
    this.groupDal.deleteGroup(groupId);
  }
  updateGroup(groupId: string, updatedGroup: GroupDTO): Promise<Group> {
    return this.groupDal.updateGroup(groupId, updatedGroup);
  }
}
