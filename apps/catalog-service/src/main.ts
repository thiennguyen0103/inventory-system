import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { CatalogServiceModule } from './catalog-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'catalog',
        protoPath: './packages/proto/catalog.proto',
        url: '0.0.0.0:5002',
      },
    },
  );
  app.useLogger(app.get(Logger));

  await app.listen();
}
bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
