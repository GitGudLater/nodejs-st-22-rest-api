import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/interfaces/dto/userdto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserDalService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  selectUserById(userId: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: userId });
  }
  selectUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }
  selectLimitedUsersBySubstring(
    loginSubstring: string,
    limit: number,
  ): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        login: Like(`%${loginSubstring}%`),
        isDeleted: true,
      },
      order: { login: 'ASC' },
      take: limit,
    });
  }
  async insertUser(newUser: User): Promise<User> {
    await this.usersRepository.insert(newUser);
    return newUser;
  }
  deleteUser(userId: string) {
    this.usersRepository.update({ id: userId }, { isDeleted: true });
  }
  async updateUser(userId: string, updatedUser: UserDTO): Promise<User> {
    await this.usersRepository.update({ id: userId }, { ...updatedUser });
    return this.selectUserById(userId);
  }
}
