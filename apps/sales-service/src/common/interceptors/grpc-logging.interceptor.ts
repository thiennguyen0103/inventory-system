import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, catchError } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import { throwError } from 'rxjs';

@Injectable()
export class GrpcLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    const rpcContext = context.switchToRpc();

    const data = rpcContext.getData<object>();

    const handler = context.getHandler().name;
    const controller = context.getClass().name;

    this.logger.info({
      service: 'sales-service',
      type: 'grpc_request',
      controller,
      handler,
      payload: data,
    });

    return next.handle().pipe(
      tap((response: object) => {
        this.logger.info({
          service: 'sales-service',
          type: 'grpc_response',
          controller,
          handler,
          duration: Date.now() - start,
          response,
        });
      }),
      catchError((error: { message: string; code: string }) => {
        this.logger.error({
          service: 'sales-service',
          type: 'grpc_error',
          controller,
          handler,
          duration: Date.now() - start,
          error: {
            message: error.message,
            code: error.code,
          },
        });

        return throwError(() => error);
      }),
    );
  }
}
