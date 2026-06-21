import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { InventoryServiceModule } from './inventory-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'inventory',
        protoPath: './packages/proto/inventory.proto',
        url: '0.0.0.0:5003',
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
