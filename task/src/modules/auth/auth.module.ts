import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/assets/consts/jwt';
import { JwtStrategy } from 'src/guards/jwt/jwt.strategy';
import { LocalStrategy } from 'src/guards/local/local.strategy';
import { AuthController } from 'src/routers/controllers/auth/auth.controller';
import { AuthService } from 'src/services/auth/auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
