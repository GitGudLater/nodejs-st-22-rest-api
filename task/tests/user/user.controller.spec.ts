import { Test, TestingModule } from '@nestjs/testing';
import { response } from 'express';
import { user } from 'src/assets/test-milestones/test.user';
import { User } from 'src/data-access/entities/user.entity';
import { UserDTO } from 'src/interfaces/dto/userdto';
import { UserController } from 'src/routers/controllers/user/user.controller';
import { UserService } from 'src/services/user/user.service';

jest.mock('./users.service');

describe('UsersController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAutoSuggestUsers', async () => {
    jest.spyOn(service, 'getUsers').mockImplementation(async () => [user]);
    const result: User[] = await controller.getAutoSuggestUsers({
      loginSubstring: user.login,
      limit: 1,
    });

    expect(result).toStrictEqual([user]);
  });

  it('getUserById', async () => {
    jest.spyOn(service, 'findUserById').mockImplementation(async () => user);
    const result: User = await controller.getUserById(user.id);

    expect(result).toBe(user);
  });

  it('createUser', async () => {
    jest.spyOn(service, 'addUser').mockImplementation(() => user);
    const result = await controller.addUser(user as UserDTO, response);

    expect(result).toBe(user);
  });

  it('updateUser', async () => {
    jest.spyOn(service, 'updateUser').mockImplementation(async () => user);
    const result: User = await controller.updateUser(user.id, user as UserDTO);

    expect(result).toBe(user);
  });

  it('deleteUser', async () => {
    const countOfDeleted = 1;
    jest
      .spyOn(service, 'deleteUser')
      .mockImplementation(async () => countOfDeleted);
    const result = await controller.markAsDelete(user.id);

    expect(result).toBe(countOfDeleted);
  });
});
