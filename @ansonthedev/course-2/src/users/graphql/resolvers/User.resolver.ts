import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserModel } from 'src/users/graphql/models/User.model';
import { UserSettingsModel } from 'src/users/graphql/models/UserSettings.model';
import { CreateUserInput } from 'src/users/graphql/inputs/CreateUser.input';
import { UsersService } from 'src/users/users.service';
import { UsersSettingsService } from 'src/users/users-settings.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private usersService: UsersService,
    private usersSettingsService: UsersSettingsService,
  ) {}

  @Query(() => [UserModel])
  async getUsers() {
    return this.usersService.getAllUsers();
  }

  @Query(() => UserModel, { nullable: true })
  async getUserById(@Args('id', { type: () => Int }) id: UserModel['id']) {
    return this.usersService.getUserById(id);
  }

  @ResolveField(() => UserSettingsModel, { name: 'settings', nullable: true })
  getUserSettings(@Parent() user: UserModel) {
    return this.usersSettingsService.getUserSettingsById(user.id);
  }

  @Mutation(() => UserModel)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }
}
