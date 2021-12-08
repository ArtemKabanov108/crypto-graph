import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http2';
import { OutgoingHttpHeaders } from 'http';

/**
 * Decorator to extract authed user from request
 */
export const UserRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): OutgoingHttpHeaders => {
    const request = ctx.switchToHttp().getRequest();
    const requestHeaders: IncomingHttpHeaders = request.headers;
    return requestHeaders;
  },
);
