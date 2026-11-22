import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { type Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  getsUsers() {
    return this.userModel.find().populate(['settings', 'posts']);
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate(['settings', 'posts']);
  }

  async createUser(createUserDTO: CreateUserDTO) {
    const { settings, ..._createUserDTO } = createUserDTO;

    if (settings) {
      const newUserSettings = new this.userSettingsModel(settings);
      const savedNewUserSettings = await newUserSettings.save();
      const newUser = new this.userModel({
        ..._createUserDTO,
        settings: savedNewUserSettings._id,
      });
      return newUser.save();
    }

    const newUser = new this.userModel(createUserDTO);
    return newUser.save();
  }

  updateUser(id: string, updateUserDTO: UpdateUserDTO) {
    return this.userModel.findByIdAndUpdate(id, updateUserDTO, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
