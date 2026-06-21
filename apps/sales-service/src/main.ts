import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { SalesServiceModule } from './sales-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SalesServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'sales',
        protoPath: './packages/proto/sales.proto',
        url: '0.0.0.0:5005',
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
