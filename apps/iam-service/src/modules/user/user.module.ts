import { Module } from '@nestjs/common';
import { UserGrpcController } from 'apps/iam-service/src/modules/user/presentation/grpc/user.grpc.controller';

@Module({
  controllers: [UserGrpcController],
  providers: [],
})
export class UserModule {}
