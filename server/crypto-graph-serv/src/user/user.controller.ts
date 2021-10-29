import {
  BadRequestException, Body,
  Controller,
  Get,
  HttpStatus, Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidationErrorObject } from '../common/objects/ValidationErrorObject';
import { UserService } from './services/user.service';
import { IRequestWithUser } from '../common/interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get-favorite')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get list favorite cryptocurrency.' })
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
    @Res() response: Response,
    @Req() request: IRequestWithUser,
  ): Promise<Response> {
    const favorites = await this.userService.getFavoriteList(request.user.id);
    console.log('0000000000000', favorites)
    return response.status(HttpStatus.OK).json(favorites);
  }

  @Post('/set-favorite')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add favorite cryptocurrency.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request error',
    type: ValidationErrorObject,
  })
  @ApiResponse({
    status: 200,
    description: 'The favorite cryptocurrency - added!',
    type: Object, // TODO add interface.
  })
  async setFavorite(
    @Res() response: Response,
    @Req() request: IRequestWithUser,
    @Body() body: Object
  ): Promise<Response> {
    const favorites = await this.userService.setFavorite(request.user.id, body);
    return response.status(HttpStatus.OK).json(favorites);
  }
}
