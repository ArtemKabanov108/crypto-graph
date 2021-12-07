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

describe('AuthController', () => {
  let controller: AuthController;

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
          useFactory: (configService) => ({
            // uri: configService.get('db.host'),
            //variant connect
            uri: 'mongodb+srv://broker:Slon55bolshoY@crypto-graph.3lmoz.mongodb.net/cryptoBase',
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
        // { provide: getModelToken('User'), useValue: mockUserRegisterData },
        // {
        //   provide: getModelToken('JwtRefreshTokenModel'),
        //   useValue: mockJwtRefreshToken,
        // },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller).not.toBeUndefined();
  });
});
