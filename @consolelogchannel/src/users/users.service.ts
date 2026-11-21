import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async getUsers() {
    this.logger.info('Get all users', {
      context: 'UsersService.getUsers',
      timestamp: new Date().toISOString(),
    });
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
      this.logger.error('Something went wrong while creating user', {
        context: 'UsersService.createUser',
        userId: user.id,
        ...(error instanceof Error && { ...error }),
      });
      throw new Error('Can not create user');
    }
  }

  private async hashPassword(password: string) {
    return await hash(password, 9);
  }
}
