import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { S3Service } from './aws/s3.service';
import { EventsModule } from './webSockets/ws-module';
import { ConfigModule } from '@nestjs/config';
import s3Config from 'config/s3.config';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [s3Config],
    }),
    EventsModule,
    AwsModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
