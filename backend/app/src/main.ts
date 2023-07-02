import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

//démarrage de l'app

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //NestFactory crée une app avec comme plan NestExpressApplication -> AppModule

  app.enableCors({ origin: 'http://localhost:3000' });
  //cross origing res. sharing gère le droit de transfèr de données entre navigateur et serveur 

  await app.listen(3001);
}
bootstrap();
