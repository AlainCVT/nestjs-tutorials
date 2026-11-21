import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersLoggerService } from './users.logger';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly usersLoggerService: UsersLoggerService) {}

  private users: User[] = [
    { name: 'Alice', email: 'alice@mail.com' },
    { name: 'Albert', email: 'albert@mail.com' },
    { name: 'Bob', email: 'bob@mail.com' },
    { name: 'Bobby', email: 'bobby@mail.com' },
    { name: 'Charlie', email: 'charlie@mail.com' },
    { name: 'Carl', email: 'carl@mail.com' },
    { name: 'David', email: 'david@mail.com' },
    { name: 'David', email: 'contact@david.com' },
    { name: 'Eve', email: 'eve@mail.com' },
    { name: 'Eva', email: 'eva@mail.com' },
    { name: 'Frank', email: 'frank@mail.com' },
    { name: 'Francis', email: 'francis@mail.com' },
    { name: 'George', email: 'george@mail.com' },
    { name: 'George', email: 'contact@george.com' },
    { name: 'Henry', email: 'henry@mail.com' },
    { name: 'Henry', email: 'contact@henry.com' },
    { name: 'Ian', email: 'ian@mail.com' },
    { name: 'Iris', email: 'iris@mail.com' },
    { name: 'Jane', email: 'jane@mail.com' },
    { name: 'John', email: 'john@mail.com' },
  ].map((user) => ({ id: crypto.randomUUID(), ...user }));

  findAllUsers({
    name = '',
    email = '',
    limit = 0,
  }: {
    name?: string;
    email?: string;
    limit?: number;
  }) {
    this.usersLoggerService.log('Finding all users');

    let users: User[] = this.users;

    if (name || email) {
      users = users.filter(
        (user) =>
          (!name || user.name.toLowerCase() === name.toLowerCase()) &&
          (!email || user.email.toLowerCase() === email.toLowerCase()),
      );
    }

    return !limit ? users : users.slice(0, limit);
  }

  findUserById(id: string) {
    this.usersLoggerService.log('Finding a user');

    return this.users.find((user) => user.id === id);
  }

  addUser(user: CreateUserDTO) {
    this.usersLoggerService.log('Creating a user');

    const newUser = {
      id: crypto.randomUUID(),
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }

  editUser(id: string, user: UpdateUserDTO) {
    this.usersLoggerService.log('Updating a user');

    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return null;
    }

    const currentUser = {
      ...this.users[userIndex],
      ...user,
    };

    this.users[userIndex] = currentUser;

    return currentUser;
  }

  removeUser(id: string) {
    this.usersLoggerService.log('Deleting a user');

    const currentUser = this.users.find((user) => user.id === id);

    if (!currentUser) {
      return null;
    }

    this.users = this.users.filter((user) => user.id !== id);

    return currentUser;
  }
}
