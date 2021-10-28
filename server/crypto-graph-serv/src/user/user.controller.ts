import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidationErrorObject } from '../common/objects/ValidationErrorObject';
import { UserService } from './services/user.service';
import {IRequestWithUser} from "../common/interfaces";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/favorites')
  @UseGuards(JwtAuthGuard)
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
    @Res() response: Response,
    @Req() request: IRequestWithUser,
  ): Promise<Response> {
    const favorites = await this.userService.getFavoriteList(request.user.id);
    if (!favorites) {
      throw new BadRequestException(['Register Error']);
    }
    return response.status(HttpStatus.OK).json(favorites);
  }
}
