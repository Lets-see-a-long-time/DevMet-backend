import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as Multer from 'multer';
import UploadResponse from '../dto/response/upload/upload.response';
import dotenv = require('dotenv');
dotenv.config();

@Injectable()
export class UploadService {
  s3 = new AWS.S3({
    // accessKeyId: process.env.AWS_ACCESS_KEY,
    accessKeyId: 'AKIAVSMV5ZX6IQ62EA2U',
    // secretAccessKey: process.env.AWS_SECRET_KEY,
    secretAccessKey: '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',
  });

  async uploadFile(file: Multer.File) {
    const AWS_S3_BUCKET = 'dmetstorage';

    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: String(file.originalname),
      Body: file.buffer,
    };

    const response = await this.s3.upload(params).promise();
    return UploadResponse.fromUpload(response);
  }
}
