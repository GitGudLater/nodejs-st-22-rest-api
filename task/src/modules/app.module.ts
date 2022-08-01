import { Module } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { User } from 'src/data-access/entities/user.entity';
import { AppController } from 'src/routers/controllers/app.controller';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-34-248-169-69.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'ivjcavfkdnvwfd',
      password:
        'admi237b9a6a80ef370a8df175c6f07b0bb887a780fa57edf8cb3c7e6d6b6e6df02en',
      database: 'd2mpikvo412346',
      entities: [User],
      synchronize: true,
      logging: false,
      url: 'postgres://ivjcavfkdnvwfd:237b9a6a80ef370a8df175c6f07b0bb887a780fa57edf8cb3c7e6d6b6e6df02e@ec2-34-248-169-69.eu-west-1.compute.amazonaws.com:5432/d2mpikvo412346',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
