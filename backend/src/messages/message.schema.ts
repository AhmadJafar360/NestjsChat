import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  sender: string; // user ID atau username

  @Prop({ required: true })
  roomId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
