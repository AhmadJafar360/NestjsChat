import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './room.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name)
    private readonly roomModel: Model<RoomDocument>, // ← gunakan RoomDocument
  ) {}

  async create(name: string, userId: string): Promise<Room> {
    const newRoom = new this.roomModel({
      name,
      createdBy: userId,
    });
    return newRoom.save();
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }
}
