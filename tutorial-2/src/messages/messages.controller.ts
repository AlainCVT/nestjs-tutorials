import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import type { MessagesDTO } from 'src/models/messages.models';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  getMessages() {
    const data = this.messagesService.getMessages();
    return data;
  }

  @Get(':id')
  getMessage(@Param('id', ParseIntPipe) id: number) {
    const data = this.messagesService.getMessage(id);
    return data;
  }

  @Post()
  postMessages(@Body('body') body: MessagesDTO) {
    const data = this.messagesService.postMessages(body);
    return data;
  }
}
