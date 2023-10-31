import { ApiField } from './../../../../common/decorator/api.decorator';

export default class UploadResponse {
  //   @ApiField({
  //     type: String,
  //     description: '업로드 파일 키',
  //     nullable: false,
  //     example: 'images/sample.png',
  //   })
  //   key!: string;

  @ApiField({
    type: String,
    description: '업로드 파일 URL',
    nullable: false,
    example: 'https://sample.domain.com/images/sample.png',
  })
  url!: string;

  @ApiField({
    type: String,
    description: '업로드 파일 제목',
    nullable: false,
    example: '인태.png',
  })
  fileName!: string;

  static fromUpload(file: any): UploadResponse {
    const response = new UploadResponse();

    response.url = file.Location;
    response.fileName = file.key;
    return response;
  }
}
