import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, RegisterDto } from '../../dto/auth.dto';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from '../../schemas/user-schema';
import { JwtRefreshToken, JwtSchema } from '../../schemas/jwt-session-schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../../auth.controller';
import { UserModule } from '../../../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import { serverConfig } from '../../../config/server.config';
import { dbConfig } from '../../../config/db.config';
import { createValidationSchema } from '../../../config/validation.schemsConfig';
import { LocalStrategy } from '../../strategies/local.strategy';
import { JwtStrategy } from '../../strategies/jwt-auth.stategy';
import { JwtRefreshTokenStrategy } from '../../strategies/jwt-refresh.strategy';
import {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  const mockUserData = {
    register: jest.fn().mockImplementation((dto: RegisterDto) => {
      return {
        ...dto,
      };
    }),
    login: jest.fn().mockImplementation((dto: LoginDto) => {
      return {
        ...dto,
      };
    }),
    create: jest.fn().mockImplementation((dto: CreateUserDto) => {
      return {
        ...dto,
      };
    }),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ _id: Types.ObjectId(), ...user }),
      ),
  };

  const mockJwtRefreshToken = {
    create: jest.fn().mockImplementation((dto: JwtRefreshToken) => {
      return {
        ...dto,
      };
    }),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ _id: Types.ObjectId('45587'), ...user }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
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
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        JwtRefreshTokenStrategy,
        { provide: getModelToken('User'), useValue: mockUserData },
        {
          provide: getModelToken('JwtRefreshTokenModel'),
          useValue: mockJwtRefreshToken,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service).not.toBeUndefined();
  });

  it('method should be Promise with IRegistrationResponse', async () => {
    const mockDataRegister = {
      nickname: 'Frog',
      email: 'frog@island.com',
      password: '123456789',
    };
    try {
      expect(
        await service.register(mockUserData.register(mockDataRegister)),
      ).toMatchObject(RegisterDto);
    } catch (err) {
      expect(err).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('method should be Promise with ILogin', async () => {
    const mockDataLogin = {
      email: 'frog@island.com',
      password: '123456789',
    };
    try {
      expect(
        await service.login(mockUserData.login(mockDataLogin)),
      ).toMatchObject(LoginDto);
    } catch (err) {
      expect(err).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('method should be Promise with User', async () => {
    const createUserMockData = {
      _id: Types.ObjectId(),
      nickname: 'Frog',
      email: 'frog@island.com',
      password: '123456789',
      watchlist: ['swamp', 'sakura', 'Eat'],
      role: 'user',
    };

    try {
      expect(
        await service.create(mockUserData.create(createUserMockData)),
      ).toMatchObject(createUserMockData);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });
});
