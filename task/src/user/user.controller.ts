import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IUser } from 'src/interfaces/models/user';
import { IUserDTO } from 'src/interfaces/dto/userdto';
import { UserService } from './user.service';

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
    @Query() query: { loginSubstring: string; limit: number },
  ): IUser[] {
    return this.userService.findLimitedUsersBySubstring(
      query.loginSubstring,
      query.limit,
    );
  }

  @Post()
  @HttpCode(201)
  addUser(@Body() newUser: IUserDTO): IUser {
    return this.userService.addUser(newUser);
  }

  @Delete(':id')
  @HttpCode(200)
  async markAsDelete(@Param('id') id: string) {
    this.userService.deleteUser(id);
  }

  @Put('id')
  updateUser(@Param('id') id: string, @Body() updatedUser: IUserDTO) {
    return this.userService.updateUser(id, updatedUser);
  }
}
