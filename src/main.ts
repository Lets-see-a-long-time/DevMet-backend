import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupSwagger } from './common/utils/swagger.utility';
import { SocketIoAdapter } from './common/adapter/socket-io.adapters';

import dotenv = require('dotenv');
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  app.enableCors();
  setupSwagger(app);
  console.log('port', process.env.NODE_ENV);
  await app.listen(3001, () => console.log('3001'));
}
bootstrap();
