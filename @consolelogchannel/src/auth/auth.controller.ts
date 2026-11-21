import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyDTO } from './AuthBody.dto';
import { AuthGuard } from './auth.guard';
import { type Request as Req } from 'express';
import { AuthInterceptor } from './auth.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(AuthInterceptor)
  login(@Body() authBody: AuthBodyDTO) {
    const data = this.authService.login(authBody);
    return data;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: Req) {
    if (!req.user) {
      throw new NotFoundException('Missing user');
    }

    return this.authService.getProfile(req.user.name);
  }
}
