import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

@Module({
  imports: [
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        params: {
          endpoint: process.env.ENDPOINT,
        },
        credentials: {
          accessKeyId: process.env.ACCESS_KEY_ID,
          secretAccessKey: process.env.SECRET_ACCESS_KEY,
        },
      },
      services: [S3],
    }),
  ],
  providers: [S3Service],
  exports: [S3Service],
})
export class AwsModule {}
