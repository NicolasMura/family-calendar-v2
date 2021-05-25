import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config =  app.get(ConfigService);

  const ALLOWED_CORS: string = config.get<string>('ALLOWED_CORS');
  if(ALLOWED_CORS) {
    let whitelist: string[];
    try {
      whitelist = ALLOWED_CORS.split(',');
    } catch (e) {}
    if (whitelist?.length > 0) {
      app.enableCors({
        origin: whitelist
        // credentials: true,
      });
    }
  }

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // const port = process.env.PORT || 3333;
  const port = config.get<number>('NODE_PORT') || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
