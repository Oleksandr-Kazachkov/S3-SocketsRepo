import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { S3Service } from 'src/aws/s3.service';

@WebSocketGateway()
export class EventsGateway {
  constructor(private readonly s3Service: S3Service) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('onConnect')
  onConnect() {
    console.log('User connected');
  }

  @SubscribeMessage('sendMessage')
  sendMessage() {
    console.log('message');
    this.server.emit('newMessage', 'cake');
  }

  @SubscribeMessage('sendAmount')
  sendAmount(@MessageBody() body: any) {
    body.number = body.number + 1;
    this.server.emit('cakes', body);
  }

  @SubscribeMessage('upload')
  async upload(@MessageBody() avatar) {
    console.log(avatar);
    const buffer = avatar as Express.Multer.File;

    const response = await this.s3Service.uploadAvatar(buffer);

    console.log(response);

    this.server.emit('uploadAvatar', response);
  }
}
