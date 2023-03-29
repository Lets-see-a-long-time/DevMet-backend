import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'src/configs/typeorm.config';
import { DevMetRestApiModule } from './common/rest-api/rest-api.module';

@Module({
  imports: [DevMetRestApiModule, TypeOrmModule.forRoot(typeORMConfig)],
})
export class DevMetModule {}
