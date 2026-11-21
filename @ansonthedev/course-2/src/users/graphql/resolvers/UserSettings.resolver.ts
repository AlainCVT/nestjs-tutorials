import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserSettingsInput } from 'src/users/graphql/inputs/CreateUserSettings.input';
import { UserSettingsModel } from 'src/users/graphql/models/UserSettings.model';
import { UsersSettingsService } from 'src/users/users-settings.service';

@Resolver()
export class UserSettingsResolver {
  constructor(private usersSettingsService: UsersSettingsService) {}

  @Mutation(() => UserSettingsModel)
  async createUserSettings(
    @Args('createUserSettingsInput')
    createUserSettingsInput: CreateUserSettingsInput,
  ) {
    return this.usersSettingsService.createUserSettings(
      createUserSettingsInput,
    );
  }
}
