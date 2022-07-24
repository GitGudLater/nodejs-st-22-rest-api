import { IsAlphanumeric, IsNotEmpty, Max, Min } from 'class-validator';

export class UserDTO {
  @IsNotEmpty({
    message: 'login cant be empty',
    context: {
      errorCode: 400,
      developerNote: 'The validated string must contain characters.',
    },
  })
  login: string;

  @IsNotEmpty({
    message: 'password cant be empty',
    context: {
      errorCode: 400,
      developerNote: 'The validated string must contain characters.',
    },
  })
  @IsAlphanumeric()
  password: string;

  @IsNotEmpty({
    message: 'age cant be empty',
    context: {
      errorCode: 400,
      developerNote: 'The validated string must contain numbers.',
    },
  })
  @Min(4, {
    message: 'age must be more than 4',
    context: {
      errorCode: 400,
      developerNote: 'mismatching age field.',
    },
  })
  @Max(130, {
    message: 'age must be less than 130',
    context: {
      errorCode: 400,
      developerNote: 'mismatching age field.',
    },
  })
  age: number;
}
