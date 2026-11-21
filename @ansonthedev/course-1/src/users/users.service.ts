import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { UserProfileEntity } from 'src/entities/UserProfile.entity';
import { CreateUserProfileDTO } from './dto/CreateUserProfile.dto';
import { CreateUserPostDTO } from './dto/CreateUserPost.dto';
import { UserPostEntity } from 'src/entities/UserPost.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserProfileEntity)
    private usersProfileRepository: Repository<UserProfileEntity>,
    @InjectRepository(UserPostEntity)
    private usersPostRepository: Repository<UserPostEntity>,
  ) {}

  getUsers() {
    return this.usersRepository.find({ relations: { profile: true } });
  }

  async createUser(createdUser: CreateUserDTO) {
    const { password, ..._createdUser } = createdUser;

    const newUser = this.usersRepository.create({
      ..._createdUser,
      password: await this.hashPassword(password),
      createdAt: new Date(),
    });
    return this.usersRepository.save(newUser);
  }

  updateUser(id: number, updatedUser: UpdateUserDTO) {
    return this.usersRepository.update({ id }, { ...updatedUser });
  }

  deleteUser(id: number) {
    return this.usersRepository.delete({ id });
  }

  async createUserProfile(
    id: number,
    createdUserProfile: CreateUserProfileDTO,
  ) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newUserProfile =
      this.usersProfileRepository.create(createdUserProfile);
    const savedUserProfile =
      await this.usersProfileRepository.save(newUserProfile);

    user.profile = savedUserProfile;

    return this.usersRepository.save(user);
  }

  async createUserPost(id: number, createdUserPost: CreateUserPostDTO) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newUserPost = this.usersPostRepository.create({
      ...createdUserPost,
      user,
    });

    return this.usersPostRepository.save(newUserPost);
  }

  private async hashPassword(password: string) {
    return await hash(password, 9);
  }
}
