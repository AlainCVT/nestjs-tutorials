import { Module } from '@nestjs/common';
import { UserResolver } from './graphql/resolvers/User.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './graphql/models/User.model';
import { UsersSettingsService } from './users-settings.service';
import { UserSettingsModel } from './graphql/models/UserSettings.model';
import { UserSettingsResolver } from './graphql/resolvers/UserSettings.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, UserSettingsModel])],
  providers: [
    UserResolver,
    UserSettingsResolver,
    UsersService,
    UsersSettingsService,
  ],
})
export class UsersModule {}
