import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUser(name: string) {
    return await this.userRepository.findOneBy({ name });
  }

  async createUser(user: User) {
    const { password, ..._user } = user;

    try {
      await this.userRepository.save({
        ..._user,
        password: await this.hashPassword(password),
      });
    } catch (error) {
      console.error(error);
      throw new Error('Can not create user');
    }
  }

  private async hashPassword(password: string) {
    return await hash(password, 9);
  }
}
