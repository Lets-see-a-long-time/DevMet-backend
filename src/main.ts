import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupSwagger } from './common/utils/swagger.utility';
import { SocketIoAdapter } from './common/adapter/socket-io.adapters';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  app.enableCors();
  setupSwagger(app);

  await app.listen(3001, () => console.log(3001));
}
bootstrap();
