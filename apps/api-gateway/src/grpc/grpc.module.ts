import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GRPC_SERVICES } from 'apps/api-gateway/src/grpc/grpc.constants';
import { CatalogClient } from 'apps/api-gateway/src/grpc/clients/catalog.client';
import { IamClient } from './clients/iam.client';
import { InventoryClient } from './clients/inventory.client';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: GRPC_SERVICES.IAM,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'iam',
            protoPath: 'packages/proto/iam.proto',
            url: config.get<string>('IAM_GRPC_URL') ?? 'localhost:5001',
          },
        }),
      },
      {
        name: GRPC_SERVICES.CATALOG,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'catalog',
            protoPath: 'packages/proto/catalog.proto',
            url: config.get<string>('CATALOG_GRPC_URL') ?? 'localhost:5002',
          },
        }),
      },
    ]),
  ],
  providers: [IamClient, CatalogClient, InventoryClient],
  exports: [IamClient, CatalogClient, InventoryClient],
})
export class GrpcModule {}
