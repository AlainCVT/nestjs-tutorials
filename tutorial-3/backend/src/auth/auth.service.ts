import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { JwtPayload } from './strategies/jwt.strategy';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerData: RegisterDTO) {
    const existingUser = await this.usersService.findByEmail(
      registerData.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already used');
    }

    const user = await this.usersService.create(registerData);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...sanitizedUser } = user;
    const token = this.generateToken(user.id, user.email);

    return {
      user: sanitizedUser,
      access_token: token,
    };
  }

  async login(loginData: LoginDTO) {
    const INVALID_CREDENTIALS_MESSAGE = 'Invalid credentials';

    const user = await this.usersService.findByEmail(loginData.email);
    if (!user) {
      throw new UnauthorizedException(INVALID_CREDENTIALS_MESSAGE);
    }

    const isPasswordValid = await this.usersService.verifyPassword(
      loginData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(INVALID_CREDENTIALS_MESSAGE);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...sanitizedUser } = user;
    const token = this.generateToken(user.id, user.email);

    return {
      user: sanitizedUser,
      access_token: token,
    };
  }

  private generateToken(id: User['id'], email: User['email']): string {
    const payload: JwtPayload = { sub: id, email };
    return this.jwtService.sign(payload);
  }
}
