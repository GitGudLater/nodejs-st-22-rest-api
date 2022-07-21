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
}
