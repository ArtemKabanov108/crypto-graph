import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerCustomOptions, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";
// import customOptions from "./common/swaggerOptions"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
      .setTitle('API Earth-size')
      .setDescription('The Earth-size API description')
      .setVersion('1.0')
      .addBearerAuth(
          { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
          'access-token',)
      .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'My API Docs',
  };

  SwaggerModule.setup('docs', app, document, customOptions);

  SwaggerModule.setup('api-doc', app, document, customOptions);

  await app.listen(7100);
}
bootstrap();
