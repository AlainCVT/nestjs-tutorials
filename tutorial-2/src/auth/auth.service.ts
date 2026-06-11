import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthBodyDTO } from './AuthBody.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authBody: AuthBodyDTO) {
    const { name, password } = authBody;

    const user = await this.userService.getUser(name);

    if (!user || !(await this.isPasswordValid(password, user.password))) {
      throw new UnauthorizedException({ error: 'User not found' });
    }

    return this.authUser(user.id, user.name);
  }

  async getProfile(name: string) {
    const user = await this.userService.getUser(name);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
    };
  }

  private async isPasswordValid(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }

  private authUser(id: string, name: string): { access_token: string } {
    const payload = { id, name };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
