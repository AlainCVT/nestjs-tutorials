import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { type Response } from 'express';
import { SUCCESS_MESSAGE_KEY } from 'src/common/decorators/success-message.decorator';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode ?? 200;

    const message =
      this.reflector.get<string>(SUCCESS_MESSAGE_KEY, context.getHandler()) ??
      'Success';

    return next.handle().pipe(
      map((data: T) => ({
        statusCode,
        message,
        data,
      })),
    );
  }
}
