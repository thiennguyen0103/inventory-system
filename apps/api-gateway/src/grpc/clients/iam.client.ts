import { type ClientGrpc } from '@nestjs/microservices';

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { GRPC_SERVICES } from 'apps/api-gateway/src/grpc/grpc.constants';
import { firstValueFrom, Observable } from 'rxjs';

interface GetUsersResponse {
  data: object;
}

interface IUserService {
  GetUsers(): Observable<GetUsersResponse>;
}

@Injectable()
export class IamClient implements OnModuleInit {
  private userService: IUserService;

  constructor(
    @Inject(GRPC_SERVICES.IAM)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
  }

  getUsers() {
    return firstValueFrom(this.userService.GetUsers());
  }
}
