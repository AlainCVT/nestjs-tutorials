import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CronReceiveService {
  @OnEvent('custom.event')
  handleCustomEvent(payload: { message: string }) {
    console.log('handleCustomEvent is running', payload.message);
  }
}
