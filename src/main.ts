import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as configs from 'config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupSwagger } from './common/utils/swagger.utility';

async function bootstrap() {
  const { port } = configs.get('server');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  setupSwagger(app);

  await app.listen(port, () => console.log(port));
}
bootstrap();
