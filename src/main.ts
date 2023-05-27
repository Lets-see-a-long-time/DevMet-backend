import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as configs from 'config';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

// const swaggerCustomOptions: SwaggerCustomOptions = {
//   swaggerOptions: {
//     persistAuthorization: true,
//   },
// };

async function bootstrap() {
  const { port } = configs.get('server');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('DevMet')
    .setDescription('DevMet API 명세')
    .setVersion('1.0')
    // .addBearerAuth
    // //   {
    // //   name: 'Authorization',
    // //   in: 'header',
    // //   description: 'access_token',
    // //   scheme: 'bearer',
    // //   type: 'http',
    // // }
    // ()
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', name: 'Authorization', in: 'header' },
      'Authorization',
    )
    .build();
  // const document = SwaggerModule.createDocument(app, config);
  const document = SwaggerModule.createDocument(app, config);

  // Swagger 문서 노출 경로 설정
  SwaggerModule.setup('api-docs', app, document);

  // SwaggerModule.setup('api-docs', app, document, {
  //   swaggerOptions: {
  //     security: [{ bearerAuth: [] }],
  //   },
  // });

  await app.listen(port, () => console.log(port));
}
bootstrap();
