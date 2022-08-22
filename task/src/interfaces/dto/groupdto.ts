import { IsAlphanumeric, IsNotEmpty, Max, Min } from 'class-validator';
import { Permission } from 'src/data-access/entities/permission.entity';

export class GroupDTO {
  @IsNotEmpty({
    message: 'name cant be empty',
    context: {
      errorCode: 400,
      developerNote: 'The validated string must contain characters.',
    },
  })
  name: string;

  @IsNotEmpty({
    message: 'permissions cant be empty',
    context: {
      errorCode: 400,
      developerNote: 'The validated string must contain characters.',
    },
  })
  permissions: Permission[];
}
