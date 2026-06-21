import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GrpcLoggingInterceptor } from 'apps/iam-service/src/common/interceptors/grpc-logging.interceptor';
import { LoggerModule as PinoModule } from 'nestjs-pino';

@Global()
@Module({
  imports: [
    PinoModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          level: config.get<string>('LOG_LEVEL') ?? 'info',
          transport: {
            targets: [
              {
                target: 'pino-pretty',
              },
              {
                target: 'pino-loki',
                options: {
                  host:
                    config.get<string>('LOKI_URL') ?? 'http://localhost:3100',
                },
              },
            ],
          },
          base: {
            service: 'procurement-service',
          },
        },
      }),
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GrpcLoggingInterceptor,
    },
  ],
  exports: [PinoModule],
})
export class LoggerModule {}
