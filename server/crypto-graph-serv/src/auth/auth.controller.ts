import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  HttpStatus, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ValidationErrorObject } from '../common/objects/ValidationErrorObject';
import { AuthService } from './services/auth/auth.service';
import { Response } from 'express';
import { SuccessSessionResponseObject } from '../common/objects/SuccessSessionResponseObject';
import { AuthGuard } from './guards/auth.guard';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 403, description: 'Access denied .' })
  @ApiResponse({
    status: 400,
    description: 'Bad request error',
    type: ValidationErrorObject,
  })
  @ApiResponse({
    status: 200,
    description: 'Success registration',
    type: SuccessSessionResponseObject,
  })
  async register(
    @Body() body: RegisterDto,
    @Res() response: Response,
  ): Promise<Response> {
    const result = await this.authService.register(body);
    if (!result) throw new BadRequestException(['Register Error']);

    response.cookie('accessToken', result.access_token);
    return response.status(HttpStatus.OK).json(result);
  }

  @Post('login')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Logged user.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request error',
    type: ValidationErrorObject,
  })
  @ApiResponse({
    status: 200,
    description: 'Success login',
    type: SuccessSessionResponseObject,
  })
  async login(
    @Body() LoginDto: LoginDto,
    @Res() response: Response,
  ): Promise<Response> {
    const result = await this.authService.login(LoginDto);
    if (!result) {
      throw new BadRequestException(['Register Error']);
    }
    response.cookie('accessToken', result);
    return response.status(HttpStatus.OK).json(result);
  }

  //Endpoint off *******************************************
  // @UseGuards(JwtAuthGuard)
  // @Post('get-user')
  // @ApiOperation({ summary: 'Logged user.' })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Bad request error',
  //   type: ValidationErrorObject,
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Success login',
  //   type: SuccessSessionResponseObject,
  // })
  // async getUser(
  //   @Body() accesToken: string,
  //   @Res() response: Response,
  // ): Promise<any> {
  //   const result = await this.authService.getUser(accesToken);
  //   if (!result) {
  //     throw new BadRequestException(['Register Error']);
  //   }
  //   return response.status(HttpStatus.OK).json(result);
  // }
}
