import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreatedUserDTO } from './dto/created-user.dto';
import { Role } from '@prisma/client';
import type { User } from './entities/user.entity';
import { UpdatedUserDTO } from './dto/updated-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createdUser: CreatedUserDTO) {
    try {
      return await this.userService.create(createdUser);
    } catch {
      throw new BadRequestException('Failed to create user');
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('role') role?: Role) {
    const users = await this.userService.findAll(role);

    if (!users.length) {
      throw new NotFoundException('No users found');
    }

    return users;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: User['id']) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('No users found');
    }

    return user;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: User['id'],
    @Body() updatedUser: UpdatedUserDTO,
  ) {
    try {
      return await this.userService.update(id, updatedUser);
    } catch {
      throw new BadRequestException('Failed to update user');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: User['id']) {
    try {
      return await this.userService.remove(id);
    } catch {
      throw new BadRequestException('Failed to remove user');
    }
  }
}
