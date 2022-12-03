import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(name: string): string {
    return `<h1>Hello World! ${name}</h1>`;
  }
}
