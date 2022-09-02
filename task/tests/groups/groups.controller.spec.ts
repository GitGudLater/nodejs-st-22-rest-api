import { Test, TestingModule } from '@nestjs/testing';
import { response } from 'express';
import { group } from 'src/assets/test-milestones/test.group';
import { user } from 'src/assets/test-milestones/test.user';
import { Group } from 'src/data-access/entities/group.entity';
import { GroupDTO } from 'src/interfaces/dto/groupdto';
import { GroupController } from 'src/routers/controllers/group/group.controller';
import { GroupService } from 'src/services/group/group.service';

jest.mock('src/services/group/group.service');

describe('GroupsController', () => {
  let controller: GroupController;
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [GroupService],
    }).compile();

    controller = module.get<GroupController>(GroupController);
    service = module.get<GroupService>(GroupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createGroup', async () => {
    jest.spyOn(service, 'addGroup').mockImplementation(() => group);

    const result = await controller.addGroup(group as GroupDTO, response);

    expect(result).toBe(group);
  });

  it('findAllGroups', async () => {
    jest.spyOn(service, 'getGroups').mockImplementation(async () => [group]);

    const result: Group[] = await controller.getGroups();

    expect(result).toStrictEqual([group]);
  });

  it('findOneGroup', async () => {
    jest.spyOn(service, 'findGroupById').mockImplementation(async () => group);

    const result: Group = await controller.getGroupById(group.id);

    expect(result).toBe(group);
  });

  it('updateGroup', async () => {
    jest.spyOn(service, 'updateGroup').mockImplementation(async () => group);

    const result: Group = await controller.updateGroup(
      group.id,
      group as GroupDTO,
    );

    expect(result).toBe(group);
  });

  it('removeGroup', async () => {
    const countOfDeleted = 1;

    jest
      .spyOn(service, 'deleteGroup')
      .mockImplementation(async () => countOfDeleted);

    const result = await controller.markAsDelete(group.id);

    expect(result).toBe(countOfDeleted);
  });

  it('addUserToGroup', async () => {
    jest
      .spyOn(service, 'addUserToGroup')
      .mockImplementation(async () => undefined);

    const result = await controller.addUsersToGroup({
      groupId: group.id,
      userId: user.id,
    });

    expect(result).toBe(undefined);
  });
});
