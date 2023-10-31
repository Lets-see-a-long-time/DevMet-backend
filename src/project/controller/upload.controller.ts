import { Controller, UseInterceptors } from '@nestjs/common';
import { PostApi } from 'src/common/decorator/api.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import UploadResponse from '../dto/response/upload/upload.response';
import * as Multer from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { UploadService } from '../service/upload.service';

@ApiTags('File Upload')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @PostApi(() => UploadResponse, {
    path: '/',
    description: '파일 업로드',
    auth: false,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File) {
    const result = await this.uploadService.uploadFile(file);
    return result;
  }
}
