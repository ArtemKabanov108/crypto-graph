import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http2';
import { JwtStrategy } from '../../auth/strategies/jwt-auth.stategy';

/**
 * Decorator to extract authed user from request
 */
export const UserRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    const requestHeaders: IncomingHttpHeaders = request.headers;
    return requestHeaders;
  },
);
