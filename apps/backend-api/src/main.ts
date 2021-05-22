/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config =  app.get(ConfigService);

  const ALLOWED_CORS = config.get<string>('ALLOWED_CORS');
  if(ALLOWED_CORS) {
    let whitelist: string[];
    try {
      whitelist = JSON.parse(ALLOWED_CORS);
    } catch (e) {}
    if (whitelist?.length > 0) {
      app.enableCors({
        origin: (origin, callback) => {
          if (whitelist.indexOf(origin) !== -1) {
            console.log("allowed cors for:", origin)
            callback(null, true)
          } else {
            console.log("blocked cors for:", origin)
            callback(new Error('Not allowed by CORS'))
          }
        },
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
