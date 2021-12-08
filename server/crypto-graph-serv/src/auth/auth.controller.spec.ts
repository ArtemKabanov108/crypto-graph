import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import { serverConfig } from '../config/server.config';
import { dbConfig } from '../config/db.config';
import { createValidationSchema } from '../config/validation.schemsConfig';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user-schema';
import { JwtRefreshToken, JwtSchema } from './schemas/jwt-session-schema';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './strategies/jwt-auth.stategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';
import { CreateUserDto, LoginDto, RegisterDto } from './dto/auth.dto';
import {
  IRequestUser,
  RegisterRoutResponse,
} from '../common/interfaces';
import { JwtAccessDto } from './dto/jwtAccess.dto';
import { Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  const jwtMock =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTdhOThmNWM4MjdkNDAyYmY3NWM4ZWMiLCJwYXNzd29yZCI6IiQyYiQxMCRDdU12ZUYwTUlGbkk3d3VwdTNvTmR1VGtjOVVnTlRQM3lHeFJGbENaS2tCcFZpT0hWcUZDRyIsImlhdCI6MTYzODk2NDg4MCwiZXhwIjoxNjM4OTY1NDgwfQ.x-vfL8eCpGozrAFj2lqdkcTDP-W9myqsq1n8u9c_6sE';

  const mockRegisterUser = {
    body: jest.fn().mockImplementation((userRegisterData: RegisterDto) => {
      return {
        ...userRegisterData,
      };
    }),
    response: jest.fn().mockImplementation((response: Response) => {
      return {
        ...response,
      };
    }),
  };

  const mockLoginUser = {
    login: jest.fn().mockImplementation((userLoginData: LoginDto) => {
      return {
        ...userLoginData,
      };
    }),
  };

  const mockTockens = {
    jwtAccess: jest.fn().mockImplementation((user: JwtAccessDto) => {
      return {
        ...user,
      };
    }),
    'refresh-tokens': jest.fn().mockImplementation((requestWithUser: IRequestUser) => {
        return {
          ...requestWithUser,
        };
      }),
  };

  const mockLogOut = {
    logout: jest.fn().mockImplementation((dto: CreateUserDto) => {
      return {
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigService,
        NestConfigModule.forRoot({
          isGlobal: true,
          expandVariables: true,
          load: [serverConfig, dbConfig],
          validationSchema: createValidationSchema(),
        }),
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get('server.jwtSecret'),
            signOptions: {
              expiresIn: configService.get('server.jwtExpiresIn'),
            },
          }),
        }),
        MongooseModule.forRootAsync({
          inject: [ConfigService],
          useFactory: () => ({
            uri: process.env.DB_HOST,
          }),
        }),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: JwtRefreshToken.name, schema: JwtSchema },
        ]),
        UserModule,
        PassportModule,
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        JwtRefreshTokenStrategy,
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authController).not.toBeUndefined();
  });

  it('knock Knock to AuthController auth/register. Should be response a json with jwt and Email.', async () => {
    const userDataRegister = {
      nickname: 'Duke',
      email: 'duke@i.ua',
      password: '123456789',
    };
    const response = {};
    try {
      expect(
        await authController.register(
          mockRegisterUser.body(userDataRegister),
          mockRegisterUser.response(response),
        ),
      ).toMatchObject(RegisterRoutResponse);
    } catch (err) {
      expect(err).toBeInstanceOf(UnauthorizedException);
    }
  });
});
