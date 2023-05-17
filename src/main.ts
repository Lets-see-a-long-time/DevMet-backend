import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as configs from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const { port } = configs.get('server');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('DevMet')
    .setDescription('DevMet API 명세')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Swagger 문서 노출 경로 설정
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port, () => console.log(port));
}
bootstrap();
