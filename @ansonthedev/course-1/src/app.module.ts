import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/User.entity';
import { UsersModule } from './users/users.module';
import { UserProfileEntity } from './entities/UserProfile.entity';
import { UserPostEntity } from './entities/UserPost.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'root_database',
      entities: [UserEntity, UserProfileEntity, UserPostEntity],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
