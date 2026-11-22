import { PrimaryColumn, Column, Entity } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity({ name: 'users_settings' })
@ObjectType()
export class UserSettingsModel {
  @PrimaryColumn()
  @Field(() => Int)
  userId!: number;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveEmails: boolean = false;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveNotifications: boolean = false;
}
