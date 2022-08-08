import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Group } from '../entities/group.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersToGroupsDalService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}
  
  addUserToGroup(user: User, groupId: string) {
    this.groupRepository
      .findOneBy({ id: groupId })
      .then((group) => group.users.push(user));
  }
}
