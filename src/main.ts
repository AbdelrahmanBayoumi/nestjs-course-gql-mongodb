import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  let baseUrl = app.getHttpServer().address().address;
  if (baseUrl === '0.0.0.0' || baseUrl === '::') {
    baseUrl = 'localhost';
  }
  logger.log(`Listening to http://${baseUrl}:${PORT}`);
  logger.log(
    `Listening to http://${baseUrl}:${PORT}/graphql for GraphQL playground`,
  );
}
bootstrap();
