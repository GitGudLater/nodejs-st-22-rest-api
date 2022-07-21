import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { IUser } from './dto/user';
import * as crypto from 'crypto';
import { UserDTO } from './dto/userdto';

@Controller()
export class AppController {
  private users: IUser[] = [];

  constructor(private readonly appService: AppService) {
    this.users.push({
      id: crypto.randomUUID(),
      login: 'guest',
      password: '123456',
      age: 18,
      isDeleted: false,
    } as IUser);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getUsers')
  getUsers(): IUser[] {
    return this.users;
  }

  @Get('getUser/:id')
  getUserById(@Param() params): IUser {
    return this.appService.findUserById(params.id, this.users);
  }

  @Get('findBySubstring/:loginSubstring')
  getUsersListByLogin(@Param() params, @Body() limit: number): IUser[] {
    const filteredUsers = this.users.map((user) => {
      if (user.login.indexOf(params.loginSubstring) !== -1 && limit > 0) {
        limit--;
        return user;
      }
    });
    return filteredUsers.sort(
      (a, b) =>
        b.login.indexOf(params.loginSubstring) -
        a.login.indexOf(params.loginSubstring),
    );
  }

  @Post('addUser')
  @HttpCode(204)
  async addUser(@Body() newUser: UserDTO) {
    this.users.push({
      ...newUser,
      id: crypto.randomUUID(),
      isDeleted: false,
    } as IUser);
  }

  @Delete('deleteUserById/:id')
  @HttpCode(204)
  async markAsDelete(@Param() params) {
    this.users.map((user) => {
      if (user.id == params.id) {
        user.isDeleted = true;
      }
      return user;
    });
  }

  @Post('updateUserById/:id')
  async updateUser(@Param() params, @Body() updatedUser: UserDTO) {
    this.users.map((user) => {
      if (user.id == params.id) {
        user = {
          id: params.id,
          isDeleted: user.isDeleted,
          ...updatedUser,
        };
      }
      return user;
    });
  }
}
