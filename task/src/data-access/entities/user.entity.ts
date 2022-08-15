import { IUser } from 'src/interfaces/models/user';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  isDeleted: boolean;
}