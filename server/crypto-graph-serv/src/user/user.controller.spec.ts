import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/schemas/user-schema';
import { JwtRefreshToken, JwtSchema } from '../auth/schemas/jwt-session-schema';
import { UserService } from './services/user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import { serverConfig } from '../config/server.config';
import { dbConfig } from '../config/db.config';
import { createValidationSchema } from '../config/validation.schemsConfig';

describe('UserController', () => {
  let controller: UserController;

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
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
