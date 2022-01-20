import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: `../${process.env.NODE_ENV}.env` });

async function bootstrap() {
  //await SlackApp.start();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
