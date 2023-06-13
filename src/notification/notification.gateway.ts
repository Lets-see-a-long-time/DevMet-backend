import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';

@WebSocketGateway({
  // transports: ['websocket'],
  namespace: 'notification',
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('Gateway');

  @WebSocketServer() nsp: Namespace;

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`${socket.id} 소켓 연결`);

    const userId = socket.handshake.query.userId;

    socket.join(userId);

    socket.emit(
      'message',
      '안녕하세요! 소켓 연결이 성공적으로 이루어졌습니다.',
    );
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`${socket.id} 소켓 연결 해제 ❌`);

    const userId = socket.handshake.query.userId as string;
    socket.leave(userId);
  }
  afterInit(server: any) {
    // this.nsp.adapter.on('delete-room', (room) => {
    //   const deletedRoom = createdRooms.find(
    //     (createdRoom) => createdRoom === room,
    //   );
    //   if (!deletedRoom) return;

    //   this.nsp.emit('delete-room', deletedRoom);
    //   createdRooms = createdRooms.filter(
    //     (createdRoom) => createdRoom !== deletedRoom,
    //   ); // 유저가 생성한 room 목록 중에 삭제되는 room 있으면 제거
    // });

    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  sendNotificationToUser(userId: number, message: string) {
    // 특정 사용자에게 메시지 전송
    this.nsp.to(userId.toString()).emit('notification', { message });
  }
}
