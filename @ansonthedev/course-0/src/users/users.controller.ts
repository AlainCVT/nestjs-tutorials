import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './types/user';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { ValidateCreateUserPipe } from './pipes/validate-create-user.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: User['id']) {
    const user = this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User width not found');
    }

    return user;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userPayload: CreateUserDTO) {
    return this.usersService.createUser(userPayload);
  }
}
