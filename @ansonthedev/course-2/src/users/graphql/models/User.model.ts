import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSettingsModel } from './UserSettings.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class UserModel {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  email!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  username?: string;

  @OneToOne(() => UserSettingsModel)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSettingsModel;
}
