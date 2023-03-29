import { Module } from '@nestjs/common';
import { DevMetModule } from './DMet/devMet.module';

@Module({
  imports: [DevMetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
