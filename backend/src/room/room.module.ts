import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './room.schema';
import { RoomsController } from './room.controller';
import { RoomsService } from './room.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
