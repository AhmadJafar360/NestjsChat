import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessagesService } from './message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() data: { roomId: string; content: string; sender: string },
    @ConnectedSocket() client: Socket,
  ) {
    const saved = await this.messagesService.saveMessage(
      data.content,
      data.sender,
      data.roomId,
    );
    // Mengirim ke semua client di room tersebut
    client.broadcast.emit(`room_${data.roomId}`, saved);
    client.emit(`room_${data.roomId}`, saved); // Mengirim ke pengirim juga
  }
}
