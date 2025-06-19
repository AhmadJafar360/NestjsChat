import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  async saveMessage(content: string, sender: string, roomId: string): Promise<Message> {
    const message = new this.messageModel({ content, sender, roomId });
    return message.save();
  }

  async findMessagesByRoom(roomId: string): Promise<Message[]> {
    return this.messageModel.find({ roomId }).sort({ createdAt: 1 }).exec();
  }
}
