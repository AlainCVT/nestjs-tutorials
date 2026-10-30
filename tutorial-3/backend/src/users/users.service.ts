import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatedUserDTO } from './dto/created-user.dto';
import { Role, User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdatedUserDTO } from './dto/updated-user.dto';

const SALT_ROUND = 10;

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createdUser: CreatedUserDTO): Promise<User> {
    const hashedPassword = await this.hashPassword(createdUser.password);

    return await this.databaseService.user.create({
      data: {
        name: createdUser.name,
        password: hashedPassword,
        email: createdUser.email,
        role: createdUser.role ?? Role.USER,
      },
    });
  }

  async findAll(role?: Role): Promise<User[]> {
    return await this.databaseService.user.findMany(
      role ? { where: { role } } : undefined,
    );
  }

  async findOne(id: User['id']): Promise<User | null> {
    return await this.databaseService.user.findUnique({ where: { id } });
  }

  async findByEmail(email: User['email']): Promise<User | null> {
    return await this.databaseService.user.findUnique({ where: { email } });
  }

  async update(id: User['id'], updatedUser: UpdatedUserDTO): Promise<User> {
    const { password: updatedUserPassword, ...restUpdatedUser } = updatedUser;

    const newHashedPassword = updatedUserPassword
      ? await this.hashPassword(updatedUserPassword)
      : undefined;

    return await this.databaseService.user.update({
      where: { id },
      data: { ...restUpdatedUser, password: newHashedPassword },
    });
  }

  async remove(id: User['id']): Promise<User> {
    return await this.databaseService.user.delete({
      where: { id },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUND);
  }

  async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
