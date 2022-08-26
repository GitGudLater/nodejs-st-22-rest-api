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
import { Response } from 'express';
import { GroupService } from 'src/services/group/group.service';
import { Group } from 'src/data-access/entities/group.entity';
import { GroupDTO } from 'src/interfaces/dto/groupdto';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(JwtAuthGuard)
  @Post('addUserToGroup')
  addUsersToGroup(@Query() query: { groupId: string; userId: string }) {
    const { groupId, userId } = query;
    this.groupService.addUserToGroup(userId, groupId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getGroups(): Promise<Group[]> {
    return await this.groupService.getGroups();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getGroupById(@Param('id') id: string): Promise<Group> {
    return await this.groupService.findGroupById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  addGroup(@Body() newGroup: GroupDTO, @Res() response: Response) {
    const group = this.groupService.addGroup(newGroup);
    group
      ? response.status(HttpStatus.CREATED).send('Group created')
      : response.status(HttpStatus.CONFLICT).send('Group name already exist');
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(200)
  async markAsDelete(@Param('id') id: string) {
    this.groupService.deleteGroup(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('id')
  updateGroup(@Param('id') id: string, @Body() updateGroup: GroupDTO) {
    return this.groupService.updateGroup(id, updateGroup);
  }
}
