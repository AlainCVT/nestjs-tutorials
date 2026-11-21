import { Module } from '@nestjs/common';
import { CronReceiveService } from './cron-receive.service';
import { CronReceiveController } from './cron-receive.controller';

@Module({
  providers: [CronReceiveService],
  controllers: [CronReceiveController]
})
export class CronReceiveModule {}
