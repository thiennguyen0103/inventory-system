import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'apps/api-gateway/src/common/logger/logger.module';
import { UserModule } from 'apps/api-gateway/src/modules/user/user.module';
import { GrpcModule } from './grpc/grpc.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    GrpcModule,
    UserModule,
  ],
  controllers: [],
})
export class ApiGatewayModule {}
