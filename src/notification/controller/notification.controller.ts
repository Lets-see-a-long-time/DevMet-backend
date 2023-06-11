import { Controller, Param, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NotificationService } from '../service/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}
  @Sse('/')
  async sendNotification(@Param() id: number): Promise<Observable<any>> {
    return await this.notificationService.handleConnection(id);
  }
}
