import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  permissions: Permission;

  @Column()
  isDeleted: boolean;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
