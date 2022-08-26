import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/data-access/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = Partial<User>>(
    err: Error,
    user: TUser,
    info: any,
  ): TUser {
    if (info && info.message === 'invalid signature')
      throw new ForbiddenException();
    if (err || !user) throw err || new UnauthorizedException();
    return user;
  }
}
