import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '../enums/cron.enums';

@Injectable()
export class CronSendService {
  constructor(private eventEmitter: EventEmitter2) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    console.log('handleCron is running');
    this.eventEmitter.emit('custom.event', { message: '10 seconds' });
  }

  triggerManually() {
    this.eventEmitter.emit('custom.event', { message: 'manually' });
  }
}
