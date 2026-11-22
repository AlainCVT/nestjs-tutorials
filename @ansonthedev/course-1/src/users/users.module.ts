import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { UserProfileEntity } from 'src/entities/UserProfile.entity';
import { UserPostEntity } from 'src/entities/UserPost.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserProfileEntity, UserPostEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
