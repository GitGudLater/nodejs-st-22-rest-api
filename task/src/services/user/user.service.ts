import { Injectable } from '@nestjs/common';
import { UserDalService } from 'src/data-access/dal/user.dal';
import { User } from 'src/data-access/entities/user.entity';
import { UserDTO } from 'src/interfaces/dto/userdto';
import * as crypto from 'crypto';
import { Argument } from 'src/interfaces/models/argument';
import { ServiceLogger } from 'src/middleware/service.logger';

@Injectable()
export class UserService {
  constructor(
    private userDal: UserDalService,
    private readonly logger: ServiceLogger = new ServiceLogger(
      UserService.name,
    ),
  ) {}

  findUserById(userId: string): Promise<User> {
    const argsCollection: Argument[] = [];
    argsCollection.push({ argumentName: 'userId', value: userId });
    this.logger.serviceMethodLog('findByUserId', argsCollection);
    return this.userDal.selectUserById(userId);
  }
  getUsers(): Promise<User[]> {
    this.logger.serviceMethodLog('getUsers', null);
    return this.userDal.selectUsers();
  }
  findLimitedUsersBySubstring(
    loginSubstring: string,
    limit: number,
  ): Promise<User[]> {
    const argsCollection: Argument[] = [];
    argsCollection.push(
      { argumentName: 'loginSubstring', value: loginSubstring },
      { argumentName: 'limit', value: limit },
    );
    this.logger.serviceMethodLog('findLimitedUsersBySubstring', argsCollection);
    return this.userDal.selectLimitedUsersBySubstring(loginSubstring, limit);
  }
  addUser(newUser: UserDTO): User {
    const argsCollection: Argument[] = [];
    argsCollection.push({ argumentName: 'newUser', value: newUser });
    this.logger.serviceMethodLog('addUser', argsCollection);
    const user = {
      ...newUser,
      id: crypto.randomUUID(),
      isDeleted: false,
    } as User;
    this.userDal.insertUser(user);
    return user;
  }
  deleteUser(userId: string) {
    const argsCollection: Argument[] = [];
    argsCollection.push({ argumentName: 'userId', value: userId });
    this.logger.serviceMethodLog('deleteUser', argsCollection);
    this.userDal.deleteUser(userId);
  }
  updateUser(userId: string, updatedUser: UserDTO): Promise<User> {
    const argsCollection: Argument[] = [];
    argsCollection.push(
      { argumentName: 'userId', value: userId },
      { argumentName: 'updatedUser', value: updatedUser },
    );
    this.logger.serviceMethodLog('updateUser', argsCollection);
    return this.userDal.updateUser(userId, updatedUser);
  }
}
