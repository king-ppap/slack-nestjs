import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { VersioningType } from '@nestjs/common';
dotenv.config({ path: `../${process.env.NODE_ENV}.env` });

async function bootstrap() {
  //await SlackApp.start();

  const app = await NestFactory.create(AppModule);

  // Versioning
  app.enableVersioning();
  // CORS
  app.enableCors();

  // Swagger
  const title = 'Livingmobile Slack';
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription('The Slack bot API')
    .setVersion('1.0')
    .addTag('livingmobile')
    .build();
  const customSwaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: title,
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customSwaggerOptions);

  await app.listen(3000);
}
bootstrap();
