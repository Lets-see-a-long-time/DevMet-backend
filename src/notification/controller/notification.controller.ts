import { Controller, Get, Param, Query, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import { NotificationService } from '../service/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Sse('/')
  async sse(@Param() userId: string): Promise<Observable<any>> {
    console.log('userId', userId);
    // return interval(5000).pipe(
    //   map((_) => ({ data: { hello: 'world', bye: 'bye' } })),
    // );
    return await this.notificationService.handleConnection(userId);
  }
}
