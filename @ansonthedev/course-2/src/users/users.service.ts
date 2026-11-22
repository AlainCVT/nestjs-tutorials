import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './graphql/models/User.model';
import { Repository } from 'typeorm';
import { CreateUserInput } from './graphql/inputs/CreateUser.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel) private usersRepository: Repository<UserModel>,
  ) {}

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async createUser(createUserInput: CreateUserInput) {
    const newUser = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newUser);
  }
}
