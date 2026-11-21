import { Module } from '@nestjs/common';
import { CronSendService } from './cron-send.service';
import { CronSendController } from './cron-send.controller';

@Module({
  providers: [CronSendService],
  controllers: [CronSendController]
})
export class CronSendModule {}
