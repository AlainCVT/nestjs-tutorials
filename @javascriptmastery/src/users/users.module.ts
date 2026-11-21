import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersLoggerService } from './users.logger';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersLoggerService],
})
export class UsersModule {}
