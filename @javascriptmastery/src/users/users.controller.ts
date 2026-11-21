import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { RoleGuard } from 'src/common/guards/role.guard';
import { SuccessMessage } from 'src/common/decorators/success-message.decorator';

@Controller('users')
@UseGuards(RoleGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users?name=:name
  @Get()
  @SuccessMessage('All users found successfully')
  readUsers(
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const allUsers = this.usersService.findAllUsers({
      name,
      email,
      limit,
    });
    if (!allUsers.length) throw new NotFoundException('Users not found');
    return allUsers;
  }

  // GET /users/:id
  @Get(':id')
  @SuccessMessage('User found successfully')
  readUsersById(@Param('id') id: string) {
    const currentUser = this.usersService.findUserById(id);
    if (!currentUser) throw new NotFoundException('User not found');
    return currentUser;
  }

  // POST /users
  @Post()
  @SuccessMessage('User added successfully')
  createUser(@Body() createUserDTO: CreateUserDTO) {
    const newUser = this.usersService.addUser(createUserDTO);
    return newUser;
  }

  // PUT /users/:id
  @Put(':id')
  @SuccessMessage('User edited successfully')
  updateUser(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    const currentUser = this.usersService.editUser(id, updateUserDTO);
    if (!currentUser) throw new NotFoundException('User not found');
    return currentUser;
  }

  // DELETE /users/:id
  @Delete('id')
  @SuccessMessage('User removed successfully')
  deleteUser(@Param('id') id: string) {
    const currentUser = this.usersService.removeUser(id);
    if (!currentUser) throw new NotFoundException('User not found');
    return currentUser;
  }
}
