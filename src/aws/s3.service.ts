import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  constructor(@InjectAwsService(S3) private s3: S3) {}

  async uploadAvatar(file: Express.Multer.File) {
    const options = {
      Bucket: 'pasimages',
      Key: `images/fb`,
      Body: file,
    };

    const response = await this.s3.upload(options).promise();

    return response.Location;
  }
}
