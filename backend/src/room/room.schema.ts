import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Room extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  createdBy: string; // userId
}

export const RoomSchema = SchemaFactory.createForClass(Room);
