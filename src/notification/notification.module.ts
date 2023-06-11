import { Module } from '@nestjs/common';
import { NotificationController } from './controller/notification.controller';
import { NotificationService } from './service/notification.service';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { NotificationRepository } from './repository/notification.repository';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [TypeOrmExModule.forCustomRepository([NotificationRepository])],
})
export class NotificationModule {}
