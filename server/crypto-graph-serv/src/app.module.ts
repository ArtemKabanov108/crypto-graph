import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GetCryptoModule } from './get-crypto/get-crypto.module';
require('dotenv/config')
const {DB_HOST} = process.env

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GetCryptoModule,
    MongooseModule.forRoot(DB_HOST),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
