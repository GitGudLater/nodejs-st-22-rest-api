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
import { UserDTO } from 'src/interfaces/dto/userdto';
import { Response } from 'express';
import { User } from 'src/db/entities/user.entity';
import { UserService } from 'src/services/user/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.findUserById(id);
  }

  @Get()
  async getAutoSuggestUsers(
    @Query() query: { loginSubstring: string; limit: number },
  ): Promise<User[]> {
    const { loginSubstring, limit } = query;
    return await this.userService.findLimitedUsersBySubstring(
      loginSubstring,
      limit,
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
