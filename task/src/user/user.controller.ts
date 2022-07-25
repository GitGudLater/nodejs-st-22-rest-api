import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { IUser } from 'src/interfaces/models/user';
import { UserDTO } from 'src/interfaces/dto/userdto';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller()
export class UserController {
  private users: IUser[] = [];

  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): IUser[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): IUser {
    return this.userService.findUserById(id);
  }

  @Get('getAutoSuggestUsers')
  getUsersListByLogin(
    @Query() loginSubstring: string,
    @Query() limit: string,
  ): IUser[] {
    return this.userService.findLimitedUsersBySubstring(
      loginSubstring,
      Number(limit),
    );
  }

  @Post()
  @HttpCode(201)
  addUser(@Body() newUser: UserDTO, @Res() response: Response) {
    const user = this.userService.addUser(newUser);
    user
      ? response.status(HttpStatus.CREATED).send('User created')
      : response.status(HttpStatus.CONFLICT).send('User login already exist');
  }

  @Delete(':id')
  @HttpCode(200)
  async markAsDelete(@Param('id') id: string) {
    this.userService.deleteUser(id);
  }

  @Put('id')
  updateUser(@Param('id') id: string, @Body() updatedUser: UserDTO) {
    return this.userService.updateUser(id, updatedUser);
  }
}
