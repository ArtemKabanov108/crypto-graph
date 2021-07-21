import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GetCryptoModule } from './get-crypto/get-crypto.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    GetCryptoModule,
    AuthModule,
    UserModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
