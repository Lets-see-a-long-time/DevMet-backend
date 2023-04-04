import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './user/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ProjectModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
