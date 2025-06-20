import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { MessagesService } from './message.service';
import { ChatGateway } from './chat.gateway';
import { MessagesController } from './message.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
  providers: [MessagesService, ChatGateway],
  controllers: [MessagesController], 
})
export class MessagesModule {}
