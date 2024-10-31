import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import 'dotenv/config';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@aquaexplore/protos';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: AUTH_PACKAGE_NAME,
        protoPath: join(
          __dirname,
          '../../node_modules/@aquaexplore/protos/src/auth.proto'
        )
      }
    }
  );

  await app.listen();
}
bootstrap();
