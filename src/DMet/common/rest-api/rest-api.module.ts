import { Module } from '@nestjs/common';
import { ProjectModule } from 'src/DMet/project/project.module';

@Module({
  imports: [ProjectModule],
  controllers: [],
  providers: [
    // Services
  ],
})
export class DevMetRestApiModule {}
