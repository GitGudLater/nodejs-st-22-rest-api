import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from 'src/data-access/entities/user.entity';
import { GroupModule } from './group/group.module';
import { Group } from 'src/data-access/entities/group.entity';

@Module({
  imports: [
    UserModule,
    GroupModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      entities: [User, Group],
      synchronize: true,
      logging: false,
      url: process.env.DB_URL
    }),
  ],
})
export class AppModule {}
