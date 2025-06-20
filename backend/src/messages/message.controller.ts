import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from './message.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':roomId')
  async getMessages(@Param('roomId') roomId: string) {
    return this.messagesService.findMessagesByRoom(roomId);
  }
}
