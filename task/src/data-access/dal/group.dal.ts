import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Group } from '../entities/group.entity';
import { GroupDTO } from 'src/interfaces/dto/groupdto';

@Injectable()
export class GroupDalService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  selectGroupById(groupId: string): Promise<Group> {
    return this.groupRepository.findOneBy({ id: groupId });
  }
  selectGroups(): Promise<Group[]> {
    return this.groupRepository.find();
  }
  async insertGroup(newGroup: Group): Promise<Group> {
    await this.groupRepository.insert(newGroup);
    return newGroup;
  }
  deleteGroup(groupId: string) {
    this.groupRepository.update({ id: groupId }, { isDeleted: true });
  }
  async updateGroup(groupId: string, updatedGroup: GroupDTO): Promise<Group> {
    await this.groupRepository.update(
      { id: groupId },
      {
        ...this.groupRepository.findBy({ id: groupId }),
        name: updatedGroup.name,
        permissions: updatedGroup.permissions,
      },
    );
    return this.selectGroupById(groupId);
  }
}
