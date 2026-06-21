import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { GRPC_SERVICES } from 'apps/api-gateway/src/grpc/grpc.constants';
import { Observable } from 'rxjs';

interface GetProductsResponse {
  data: object;
}

interface ICatalogService {
  GetProducts(): Observable<GetProductsResponse>;
}

@Injectable()
export class CatalogClient implements OnModuleInit {
  private catalogService: ICatalogService;

  constructor(
    @Inject(GRPC_SERVICES.CATALOG)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.catalogService =
      this.client.getService<ICatalogService>('CatalogService');
  }
}
