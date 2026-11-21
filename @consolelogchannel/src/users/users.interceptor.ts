import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from './user.entity';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<User[]>,
  ): Observable<any> {
    return (
      next
        .handle()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .pipe(map((data) => data.map(({ password, ...user }) => user)))
    );
  }
}
