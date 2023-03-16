import { Module } from '@nestjs/common';
import { S3Service } from 'src/aws/s3.service';
import { EventsGateway } from './ws-events';

@Module({
  providers: [EventsGateway, S3Service],
})
export class EventsModule {}
