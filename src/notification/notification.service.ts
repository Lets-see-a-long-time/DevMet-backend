import { Injectable } from '@nestjs/common';
import { CreateNotificationRequest } from './dto/notification/request/create-notification.request';
import { Notification } from './entity/notification.entity';
import { NotificationRepository } from './repository/alarm.repository';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async createNotification(
    request: CreateNotificationRequest,
  ): Promise<Notification> {
    const { message, targetUserId, type } = request;

    const notification = await this.notificationRepository.create({
      message,
      targetUserId,
      type,
    });

    await this.notificationRepository.save(notification);

    return notification;
  }
}
