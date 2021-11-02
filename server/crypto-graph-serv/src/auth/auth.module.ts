import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-auth.stategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtRefreshToken, JwtSchema } from '../user/schemas/jwt-session-schema';
import { User, UserSchema } from '../user/schemas/user-schema';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('server.jwtSecret'),
        signOptions: {
          expiresIn: configService.get('server.jwtExpiresIn'),
        },
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: JwtRefreshToken.name, schema: JwtSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
