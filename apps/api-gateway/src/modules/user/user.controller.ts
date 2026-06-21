import { Controller, Get } from '@nestjs/common';
import { IamClient } from 'apps/api-gateway/src/grpc/clients/iam.client';
import { PinoLogger } from 'nestjs-pino';

@Controller('users')
export class UsersController {
  constructor(
    private readonly iamClient: IamClient,
    private readonly logger: PinoLogger,
  ) {}

  @Get()
  async findAll() {
    this.logger.info({
      service: 'api-gateway',
      event: 'GET_USERS',
    });
    return this.iamClient.getUsers();
  }
}
