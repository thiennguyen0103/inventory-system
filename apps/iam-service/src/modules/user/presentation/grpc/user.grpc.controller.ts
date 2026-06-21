import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';

@Controller()
export class UserGrpcController {
  constructor(private readonly logger: PinoLogger) {}

  @GrpcMethod('UserService', 'GetUsers')
  getUsers() {
    this.logger.info({
      service: 'iam-service',
      event: 'GET_USERS',
    });
    return {
      users: [
        {
          id: '1',
          email: 'admin@test.com',
          firstName: 'Admin',
          lastName: 'System',
        },
        {
          id: '2',
          email: 'user@test.com',
          firstName: 'Normal',
          lastName: 'User',
        },
      ],
    };
  }
}
