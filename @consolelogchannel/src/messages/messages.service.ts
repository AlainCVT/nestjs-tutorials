import { Injectable } from '@nestjs/common';
import { MessagesDTO } from 'src/models/messages.models';

@Injectable()
export class MessagesService {
  getMessages(): string {
    return 'All messages.';
  }

  getMessage(id: number): string {
    return `Message id: ${id}.`;
  }

  postMessages(body: MessagesDTO): string {
    const { content } = body;

    return `Message posted: « ${content} »`;
  }
}
