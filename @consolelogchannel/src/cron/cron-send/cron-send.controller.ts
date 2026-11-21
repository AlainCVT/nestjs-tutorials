import { Controller, Post } from '@nestjs/common';
import { CronSendService } from './cron-send.service';

@Controller('cron-send')
export class CronSendController {
  constructor(private readonly cronSendService: CronSendService) {}

  @Post('trigger')
  triggerManually() {
    this.cronSendService.triggerManually();

    return {
      status: 'Manually triggered',
    };
  }
}
