import { ConfigType } from '@nestjs/config';
import { IS_PUBLIC_KEY } from './../../decorators/public.decorator';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import config from '../../../env/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    return isPublic || this.hasAuthorization(request.get('auth'));
  }

  private hasAuthorization(apiKey?: string) {
    const isAuth = apiKey === this.configService.apiKey;
    if (isAuth) {
      return true;
    }
    throw new UnauthorizedException('Invalid Api key');
  }
}
