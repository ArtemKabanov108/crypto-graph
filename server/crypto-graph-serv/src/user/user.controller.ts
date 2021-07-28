import {
  BadRequestException, Body,
  Controller,
  Get,
  HttpStatus, Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidationErrorObject } from '../common/objects/ValidationErrorObject';
import { SuccessSessionResponseObject } from '../common/objects/SuccessSessionResponseObject';
import { UserService } from './user.service';
import { UserRequest } from '../common/decorators/auth-request.decorator';
import {LoginDto} from "../auth/dto/auth.dto";

@Controller('user')
export class UserController {
  constructor(private readonly getUserFavorites: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/favorites')
  @ApiOperation({ summary: 'Logged user.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request error',
    type: ValidationErrorObject,
  })
  @ApiResponse({
    status: 200,
    description: 'The list favorite cryptocurrency - received!',
    type: Object, // TODO add interface.
  })
  async getFavorites(
    @UserRequest() accessToken: string,
    @Res() response: Response,
    @Body() body: LoginDto,
  ): Promise<Object> {
    const favorites = await this.getUserFavorites.getFavoriteList(body.email);
    if (!favorites) {
      throw new BadRequestException(['Register Error']);
    }
    return response.status(HttpStatus.OK).json(favorites);
  }
}
