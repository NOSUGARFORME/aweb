import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.SERVER_PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: `http:localhost:{FRONTEND_PORT}`,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Учёт услуг в AskerWeb')
    .setVersion('1.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
start();
