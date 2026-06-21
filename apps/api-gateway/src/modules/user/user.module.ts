import { Module } from '@nestjs/common';
import { UsersController } from 'apps/api-gateway/src/modules/user/user.controller';
import { GrpcModule } from 'apps/api-gateway/src/grpc/grpc.module';

@Module({
  imports: [GrpcModule],
  controllers: [UsersController],
})
export class UserModule {}
