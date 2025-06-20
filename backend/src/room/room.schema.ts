import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  name: string;

  @Prop()
  createdBy: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

// ✅ Tambahkan ini:
export type RoomDocument = Room & Document;

export const RoomSchema = SchemaFactory.createForClass(Room);
