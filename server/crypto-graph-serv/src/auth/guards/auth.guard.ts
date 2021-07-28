import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LocalStrategy } from '../strategies/local.strategy';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly localStrategy: LocalStrategy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { body: user } = context.switchToHttp().getRequest();
    return this.localStrategy.validate(user);
  }
}
