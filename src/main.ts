import "reflect-metadata";

import { PassportModule } from '@nestjs/passport';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AllExceptionsFilter } from '@core/utils/exceptions.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import * as compression from 'compression';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as Ddos from 'ddos';
import * as cors from 'cors';
import { noop } from 'rxjs';

async function bootstrap() {
  PassportModule.register({ property: 'user' });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  const K = 'Oops, Nothing Here :)';
  app.enable('trust proxy');
  app.use(compression());

  // DENY KNOWN REST API VULNERABILITIES
  app.use(helmet.hidePoweredBy({ setTo: 'PHP/5.3.2' }));
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.noSniff());

  app.use('/', cors());

  // APPLICATION LAYER DDOS PROTECTION
  const ddos = new Ddos({ burst: 10, limit: 15 });
  process.env.NODE_ENV === 'production' ? app.use(ddos.express) : noop();

  // CRAWL DENIAL FOR SEARCH ENGINES
  app.use('/robots.txt', (requset: any, response: any) =>
    response.type('text/plain').send('User-agent: *\nDisallow: /'));

  // HEALTH CHECK URL @ index.html
  app.use('/index.html', (request: any, response: any) => response.send(K));

  // MORGAN LOGGER
  // app.use(morgan('dev'));

  await app.listen(process.env.PORT);
}
bootstrap();
