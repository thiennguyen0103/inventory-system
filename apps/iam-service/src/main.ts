import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { IamServiceModule } from './iam-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    IamServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'iam',
        protoPath: './packages/proto/iam.proto',
        url: '0.0.0.0:5001',
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
