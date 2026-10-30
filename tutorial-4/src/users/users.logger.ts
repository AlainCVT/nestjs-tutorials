import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersLoggerService {
  log(message: string) {
    console.log('[LOG]', message);
  }
}
