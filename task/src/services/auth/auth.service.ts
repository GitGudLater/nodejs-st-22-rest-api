import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/data-access/entities/user.entity';
import { AccessToken } from 'src/interfaces/a-token/access-token-interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger();

  public async validateUser(login: string, password: string): Promise<User> {
    const user = await this.userService.findUserByLogin(login);
    return user && user.password === password ? user : null;
  }

  public async login(user: User): Promise<AccessToken> {
    const payload = { sub: user.id };
    this.logger.debug(
      `Generated JWT token with payload ${JSON.stringify(payload)}`,
    );
    return { access_token: this.jwtService.sign(payload) };
  }
}