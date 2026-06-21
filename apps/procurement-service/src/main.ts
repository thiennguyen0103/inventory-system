import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { ProcurementServiceModule } from './procurement-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProcurementServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'procurement',
        protoPath: './packages/proto/procurement.proto',
        url: '0.0.0.0:5004',
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
