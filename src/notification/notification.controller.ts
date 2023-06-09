import { Controller, Sse } from '@nestjs/common';
import { interval, map, Observable, Subject, takeUntil } from 'rxjs';

@Controller('notification')
export class NotificationController {
  @Sse('sse')
  sendNotification(): Observable<any> {
    let count = 0;
    const isDone = new Subject<void>();
    return interval(5000).pipe(
      takeUntil(isDone),
      map((value, index) => {
        count += 1;
        if (count > 10) {
          isDone.next();
          isDone.complete();
        }
        return {
          data: String(count),
          type: count < 10 ? 'wait' : 'done',
        };
      }),
    );
  }
}
