import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersInterceptor } from './users.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(UsersInterceptor)
  async getUsers() {
    const data = await this.usersService.getUsers();
    return data;
  }

  @Get(':name')
  async getUser(@Param('name') name: string) {
    const data = await this.usersService.getUser(name);
    return data;
  }

  @Post()
  async createUser(@Body() user: User) {
    return await this.usersService.createUser(user);
  }
}
