import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { traceMiddleware } from 'apps/api-gateway/src/common/middleware/trace.middleware';
import { Logger } from 'nestjs-pino';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.use(traceMiddleware);
  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setVersion('1.0')
    .addTag('inventory')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.port ?? 3000);
}
bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
