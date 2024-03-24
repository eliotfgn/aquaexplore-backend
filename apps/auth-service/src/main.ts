import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'aquaexplore-auth-service',
          brokers: ['localhost:9092'],
          /*ssl: true,
          sasl: {
            mechanism: 'scram-sha-256',
            username:
              'ZGl2aW5lLXNhbG1vbi0xMDExMiT07qSh7U71Bfb20tREeXchCaQ8dsdUfImA8mc',
            password: 'Yzg4ZDMzYzAtZWVhOS00YmFhLWI4NzktODJiMmRlN2MyMWVk',
          },*/
          logLevel: logLevel.ERROR,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
