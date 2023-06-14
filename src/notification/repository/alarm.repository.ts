import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Notification } from '../entity/notification.entity';

@CustomRepository(Notification)
export class NotificationRepository extends Repository<Notification> {}
