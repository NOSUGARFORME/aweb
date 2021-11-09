import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.SERVER_PORT || 5000;
  const app = await NestFactory.create(AppModule);
  console.log(process.env.J);
  const config = new DocumentBuilder()
    .setTitle('Учёт услуг в AskerWeb')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
start();
