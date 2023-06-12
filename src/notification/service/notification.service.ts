import { Injectable } from '@nestjs/common';
import { filter, Observable, Subject } from 'rxjs';

interface SseMessage {
  userId: string;
  data: any;
}

@Injectable()
export class NotificationService {
  notificationEvents: Record<string, Subject<any>> = {};
  private notificationSubject: Subject<SseMessage> = new Subject<SseMessage>();
  // async sendNotification(userId: string, message: string) {
  //   if (this.notificationEvents[userId]) {
  //     this.notificationEvents[userId].next({ data: { message } });
  //   } else {
  //     await this.handleConnection(userId, 'send');
  //     this.notificationEvents[userId].next({ data: { message } });
  //   }
  // }
  handleConnection(userId: string) {
    if (!this.notificationEvents[userId]) {
      console.log('userId', userId);
      this.notificationEvents[userId] = new Subject();
      // setInterval(() => {
      this.notificationEvents[userId].next({
        data: { status: 'connect' },
      });
      // }, 5000);
    }
    return this.notificationEvents[userId].asObservable();
  }

  sendNotificationToClient(userId: string, message: string) {
    const sseMessage: SseMessage = {
      userId,
      data: {
        message,
      },
    };

    this.notificationSubject.next(sseMessage);
  }

  getNotificationStreamForClient(userId: string): Observable<SseMessage> {
    return this.notificationSubject
      .asObservable()
      .pipe(filter((message) => message.userId === userId));
  }
}
