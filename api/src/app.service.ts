import { ConfigType } from '@nestjs/config';
import { Injectable, Inject } from '@nestjs/common';
import config from './env/config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(name: string): string {
    return this.configService.apiKey;
  }
}
