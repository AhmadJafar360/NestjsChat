import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './room.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async create(name: string, userId: string): Promise<Room> {
    return this.roomModel.create({ name, createdBy: userId });
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }
}
