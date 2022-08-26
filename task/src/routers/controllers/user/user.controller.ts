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
  UseGuards,
} from '@nestjs/common';
import { UserDTO } from 'src/interfaces/dto/userdto';
import { Response } from 'express';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/data-access/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.findUserById(id);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(200)
  async markAsDelete(@Param('id') id: string) {
    this.userService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('id')
  updateUser(@Param('id') id: string, @Body() updatedUser: UserDTO) {
    return this.userService.updateUser(id, updatedUser);
  }
}
