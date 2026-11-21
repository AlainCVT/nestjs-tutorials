import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { CreateUserProfileDTO } from './dto/CreateUserProfile.dto';
import { CreateUserPostDTO } from './dto/CreateUserPost.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() createdUser: CreateUserDTO) {
    return this.usersService.createUser(createdUser);
  }

  @Put(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUser: UpdateUserDTO,
  ) {
    return this.usersService.updateUser(id, updatedUser);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createdUserProfile: CreateUserProfileDTO,
  ) {
    return this.usersService.createUserProfile(id, createdUserProfile);
  }

  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createdUserPost: CreateUserPostDTO,
  ) {
    return this.usersService.createUserPost(id, createdUserPost);
  }
}
