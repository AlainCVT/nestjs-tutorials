import { Injectable } from '@nestjs/common';
import { User } from './types/user';

@Injectable()
export class UsersService {
  private fakeUsers: User[] = [
    { id: 0, username: 'Alvin', email: 'alvin@mail.com', age: 34 },
    { id: 1, username: 'Bryan', email: 'bryan@mail.com', age: 27 },
    { id: 2, username: 'Chris', email: 'chris@mail.com', age: 40 },
  ];

  getUsers(): User[] {
    return this.fakeUsers;
  }

  getUserById(id: User['id']): User | null {
    return this.fakeUsers.find((user) => user.id === id) || null;
  }

  createUser(userPayload: Omit<User, 'id'>): void {
    const newUser = {
      id: Math.max(...this.fakeUsers.map((user) => user.id)) + 1,
      ...userPayload,
    };
    this.fakeUsers.push(newUser);
  }
}
