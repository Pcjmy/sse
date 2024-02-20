import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('stream')
  stream() {
    return new Observable((observer) => {
      observer.next({ data: { msg: 'aaa' } });

      setTimeout(() => {
        observer.next({ data: { msg: 'bbb' } });
      }, 2000);

      setTimeout(() => {
        observer.next({ data: { msg: 'ccc' } });
      }, 5000);
    });
  }
}
