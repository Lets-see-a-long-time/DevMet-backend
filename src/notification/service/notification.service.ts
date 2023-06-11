import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {
  notificationEvents: Record<string, Subject<any>> = {};
  async handleConnection(id: number) {
    console.log('userId', id);
    if (!this.notificationEvents[id]) {
      this.notificationEvents[id] = new Subject();
    }

    // setInterval(() => {
    //   this.notificationEvents[id].next({
    //     data: { message: id },
    //   });
    // }, 3000);

    return this.notificationEvents[id].asObservable();
  }
}
