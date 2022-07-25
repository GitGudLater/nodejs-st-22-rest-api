import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces/models/user';
import { IUserDTO } from 'src/interfaces/dto/userdto';
@Injectable()
export class UserService {
  private users: IUser[] = [];

  findUserById(id: string): IUser {
    return this.users.find((user) => user.id == id);
  }
  getUsers(): IUser[] {
    return this.users;
  }
  findLimitedUsersBySubstring(loginSubstring: string, limit: number): IUser[] {
    if (!loginSubstring) return this.users;
    return this.users
      .map((user) => {
        if (user.login.includes(loginSubstring) && limit > 0) {
          limit--;
          return user;
        }
      })
      .filter((user) => !user.isDeleted)
      .sort(
        (a, b) =>
          b.login.indexOf(loginSubstring) - a.login.indexOf(loginSubstring),
      );
  }
  addUser(newUser: IUserDTO): IUser {
    this.users.push({
      ...newUser,
      id: crypto.randomUUID(),
      isDeleted: false,
    } as IUser);
    return this.users.find((user) => user.login == newUser.login);
  }
  deleteUser(userId) {
    this.users[this.users.findIndex((user) => (user.id = userId))].isDeleted =
      true;
  }
  updateUser(userId: string, updatedUser: IUserDTO): IUser {
    this.users[this.users.findIndex((user) => (user.id = userId))] = {
      id: userId,
      isDeleted: this.findUserById(userId).isDeleted,
      ...updatedUser,
    };
    return this.findUserById(userId);
  }
}
