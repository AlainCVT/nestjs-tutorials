import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSettingsModel } from './graphql/models/UserSettings.model';
import { CreateUserSettingsInput } from './graphql/inputs/CreateUserSettings.input';
import { UserModel } from './graphql/models/User.model';

@Injectable()
export class UsersSettingsService {
  constructor(
    @InjectRepository(UserSettingsModel)
    private usersSettingsRepository: Repository<UserSettingsModel>,
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) {}

  async getUserSettingsById(userId: number) {
    return this.usersSettingsRepository.findOneBy({ userId });
  }

  async createUserSettings(createUserSettingsInput: CreateUserSettingsInput) {
    const { userId } = createUserSettingsInput;
    const currentUser = await this.usersRepository.findOneBy({ id: userId });

    if (!currentUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const newUserSettings = this.usersSettingsRepository.create(
      createUserSettingsInput,
    );
    const savesUserSettings =
      await this.usersSettingsRepository.save(newUserSettings);

    currentUser.settings = savesUserSettings;
    await this.usersRepository.save(currentUser);

    return savesUserSettings;
  }
}
