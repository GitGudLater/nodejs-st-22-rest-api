import { Group } from "src/data-access/entities/group.entity";

export const group: Group = {
  id: 'testId',
  name: 'test group',
  permissions: [ 'WRITE', 'DELETE'],
} as Group;