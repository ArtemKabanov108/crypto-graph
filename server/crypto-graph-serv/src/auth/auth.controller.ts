import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UseGuards,
  Req, Get,
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
import { UserService } from '../user/services/user.service';
import { IRequestWithUser } from '../common/interfaces';
import JwtRefreshGuard from './guards/jwt-refresh.guard';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
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
    const { getedUser, accessToken } = await this.authService.register(body);
    const refreshToken = this.authService.getCookieWithJwtRefreshToken(getedUser._id);
    if (!getedUser) throw new BadRequestException(['Register Error']);

    response.cookie('refreshToken', refreshToken);
    //@
    // It's almost security variant.
    // response.cookie('Set-Cookie', refreshTokenCookie, { domain: '.crypto-graph.com', path: '/auth/' });
    //@
    return response.status(HttpStatus.OK).json(accessToken);
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
    @Body() user: LoginDto,
    @Res() response: Response,
    @Req() request: IRequestWithUser,
    // attention! Promise<any> has stump(заглушка) for type! TODO fix that.
  ): Promise<Response> {
    const loggedUser = await this.authService.login(user);
    const accessToken = this.authService.getJwtAccessToken( loggedUser._id, loggedUser.password );
    const refreshToken = this.authService.getCookieWithJwtRefreshToken( loggedUser._id );
    await this.userService.setCurrentRefreshToken(refreshToken, loggedUser._id);

    if (!loggedUser) {
      throw new BadRequestException(['Register Error']);
    }

    response.cookie('refreshToken', refreshToken);
    //@
    // It's almost security variant.
    // response.cookie('Set-Cookie', refreshTokenCookie, { domain: '.crypto-graph.com', path: '/auth/' });
    //@
    return response.status(HttpStatus.OK).json({jwt: accessToken, email: loggedUser.email});
  }

  @Get('refresh-tokens')
  @UseGuards(JwtRefreshGuard)
  refresh(@Req() request: IRequestWithUser, @Res() response: Response) {
    console.log("/auth/refresh-tokens", request.user)
    const accessToken = this.authService.getJwtAccessToken(
      request.user._id,
      request.user.password,
    );
    const refreshToken = this.authService.getCookieWithJwtRefreshToken(request.user._id);
    this.userService.setCurrentRefreshToken(refreshToken, request.user._id)
    response.cookie('refreshToken', refreshToken);
    //@
    // It's almost security variant.
    // response.cookie('Set-Cookie', refreshTokenCookie, { domain: '.crypto-graph.com', path: '/auth/' });
    //@
    return response.status(HttpStatus.OK).json(accessToken);
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
