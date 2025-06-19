import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './room/room.module'; // ← ini dia baris tambahannya
import { MessagesModule } from './messages/message.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chatapp'),
    AuthModule,
    UsersModule,
    RoomsModule,
    MessagesModule,
  ],
})
export class AppModule {}
