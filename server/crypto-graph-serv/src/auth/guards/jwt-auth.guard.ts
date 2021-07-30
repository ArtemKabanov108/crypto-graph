import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationErrorObject } from '../../common/objects/ValidationErrorObject';

@Injectable()
export class JwtAuthGuard extends AuthGuard('My-jwt') {}
