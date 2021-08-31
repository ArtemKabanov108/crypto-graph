import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import { serverConfig } from './server.config';
import { dbConfig } from './db.config';
import { MongooseModule } from '@nestjs/mongoose';
import { createValidationSchema } from './validation.schemsConfig';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig, dbConfig],
      validationSchema: createValidationSchema(),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService) => ({
        uri: configService.get('db.host'),
        //variant connect
        // uri: dbConfig().dbHost
      }),
    }),
  ],
})
export class ConfigModule {}