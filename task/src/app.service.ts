import { Injectable } from '@nestjs/common';
import { IUser } from './dto/user';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  findUserById(id: string, users: IUser[]): IUser {
    return users.find((user) => user.id == id);
  }
  sortBySubstring(
    users: IUser[],
    loginSubstring: string,
    limit: number,
  ): IUser[] {
    const filteredUsers = users.map((user) => {
      if (user.login.indexOf(loginSubstring) !== -1 && limit > 0) {
        limit--;
        return user;
      }
    });
    return filteredUsers.sort(
      (a, b) =>
        b.login.indexOf(loginSubstring) - a.login.indexOf(loginSubstring),
    );
  }
}
