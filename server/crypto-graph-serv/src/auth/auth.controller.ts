import {BadRequestException, Body, Controller, Post, Res, HttpStatus, Get, Ip, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {LoginDto, RegisterDto} from "./dto/auth.dto";
import {ValidationErrorObject} from "../common/objects/ValidationErrorObject";
import {AuthService} from "./services/auth/auth.service";
import {Response} from "express";
import ISuccessSessionResponse from "../common/interfaces";
import {SuccessSessionResponseObject} from "../common/objects/SuccessSessionResponseObject";
import {AuthGuard} from "@nestjs/passport";

@ApiBearerAuth()
@ApiTags('auth')
// @UseGuards(AuthGuard('local')) // проверить на работоспособность
@Controller('auth')
export class AuthController {
constructor(private authService: AuthService ) {}

    // @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation({ summary: 'Logged user.' })
    @ApiResponse({
        status: 400,
        description: 'Bad request error',
        type: ValidationErrorObject
    })
    @ApiResponse({
        status: 200,
        description: 'Success login',
        type: SuccessSessionResponseObject,
    })
    async login(@Body() LoginDto: LoginDto, @Res() response: Response):Promise<Response> {
        const result = await this.authService.login(LoginDto);
        if(!result)
            throw new BadRequestException(['Register Error'])
        // response.cookie('sessionId', result.session.sessionId)
        return response.status(HttpStatus.OK).json(result)
    }

    // @UseGuards(AuthGuard('local'))
    @Post('register')
    @ApiOperation({ summary: 'Create User' })
    @ApiResponse({ status: 403, description: 'Access denied .' })
    @ApiResponse({
        status: 400,
        description: 'Bad request error',
        type: ValidationErrorObject
    })
    @ApiResponse({
        status: 200,
        description: 'Success registration',
        type: SuccessSessionResponseObject,
    })

    async register(@Body() body: RegisterDto, @Res() response: Response): Promise<Response> {
        const result = await this.authService.register(body)
        if(!result)
            throw new BadRequestException(['Register Error'])
        // response.cookie('sessionId', result.session.sessionId)
        return response.status(HttpStatus.OK).json(result)
    }


}

