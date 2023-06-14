import { Module } from '@nestjs/common';
import { NotificationController } from './controller/notification.controller';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { NotificationRepository } from './repository/alarm.repository';
import { TypeOrmExModule } from 'src/configs/typeorm.module';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  imports: [TypeOrmExModule.forCustomRepository([NotificationRepository])],
})
export class NotificationModule {}
