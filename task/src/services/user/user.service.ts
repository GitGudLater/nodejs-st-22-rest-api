import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/interfaces/dto/userdto';
import { User } from 'src/db/entities/user.entity';
import { UserDalService } from 'src/db/dal/user.dal';

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
