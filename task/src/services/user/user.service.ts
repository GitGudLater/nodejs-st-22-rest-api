import { Injectable } from '@nestjs/common';
import { UserDalService } from 'src/data-access/dal/user.dal';
import { User } from 'src/data-access/entities/user.entity';
import { UserDTO } from 'src/interfaces/dto/userdto';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(private userDal: UserDalService) {}

  findUserById(userId: string): Promise<User> {
    return this.userDal.selectUserById(userId);
  }
  getUsers(): Promise<User[]> {
    return this.userDal.selectUsers();
  }
  findLimitedUsersBySubstring(
    loginSubstring: string,
    limit: number,
  ): Promise<User[]> {
    return this.userDal.selectLimitedUsersBySubstring(loginSubstring, limit);
  }
  addUser(newUser: UserDTO): User {
    const user = {
      ...newUser,
      id: crypto.randomUUID(),
      isDeleted: false,
    } as User;
    this.userDal.insertUser(user);
    return user;
  }
  deleteUser(userId: string) {
    this.userDal.deleteUser(userId);
  }
  updateUser(userId: string, updatedUser: UserDTO): Promise<User> {
    return this.userDal.updateUser(userId, updatedUser);
  }
}
