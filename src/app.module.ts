import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { Project } from './DMet/project/domain/entity/project.entity';
import { ProjectModule } from './DMet/project/project.module';

@Module({
  imports: [
    ProjectModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: 'localhost',
      username: 'root',
      password: 'dmet',
      database: 'dmet',
      entities: [Project],
      synchronize: true,
    }),
    // TypeOrmModule.forRoot(typeORMConfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
