import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'aquaexplore-waterway-service',
          brokers: [process.env.KAFKA_BROKER!],
          /* ssl: true,
        sasl: {
          mechanism: 'scram-sha-256',
          username: process.env.KAFKA_USERNAME!,
          password: process.env.KAFKA_PASSWORD!
        }, */
          logLevel: logLevel.ERROR,
          requestTimeout: 45000,
          connectionTimeout: 45000,
        },
      },
    },
  );
  await app.listen();
}

bootstrap();
