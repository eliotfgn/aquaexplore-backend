import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/features/auth/auth.module';
import { AllExceptionsFilter } from './core/interceptors/all.exception-filter';
import { RpcExceptionFilter } from './core/interceptors/rpc.interceptor';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: RpcExceptionFilter },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
