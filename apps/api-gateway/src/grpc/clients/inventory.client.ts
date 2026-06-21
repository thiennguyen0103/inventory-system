import { type ClientGrpc } from '@nestjs/microservices';

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { GRPC_SERVICES } from 'apps/api-gateway/src/grpc/grpc.constants';
import { firstValueFrom, Observable } from 'rxjs';

interface GetInventoriesResponse {
  data: object;
}

interface IInventoryService {
  GetInventories(): Observable<GetInventoriesResponse>;
}

@Injectable()
export class InventoryClient implements OnModuleInit {
  private inventoryService: IInventoryService;

  constructor(
    @Inject(GRPC_SERVICES.INVENTORY)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.inventoryService =
      this.client.getService<IInventoryService>('InventoryService');
  }

  getInventories() {
    return firstValueFrom(this.inventoryService.GetInventories());
  }
}
