import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe, VersioningType } from '@nestjs/common';
dotenv.config({ path: `../${process.env.NODE_ENV}.env` });

async function bootstrap() {
  //await SlackApp.start();

  const app = await NestFactory.create(AppModule);

  // Versioning
  app.enableVersioning();
  // CORS
  app.enableCors();

  // Swagger
  const title = 'Livingmobile Bot';
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(title)
    .setVersion('1.0')
    .build();
  const customSwaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: title,
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, customSwaggerOptions);

  // Auto-validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
