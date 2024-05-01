import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'aquaexplore/auth-service',
        brokers: [process.env.KAFKA_BROKER!],
        /* ssl: true,
        sasl: {
          mechanism: 'scram-sha-256',
          username: process.env.KAFKA_USERNAME!,
          password: process.env.KAFKA_PASSWORD!
        }, */
        logLevel: logLevel.ERROR,
        requestTimeout: 45000,
        connectionTimeout: 45000
      }
    }
  });

  /* app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'aquaexplore-auth-service',
        brokers: ['pkc-p11xm.us-east-1.aws.confluent.cloud:9092'],
        ssl: true,
        sasl: {
          mechanism: 'plain',
          username: 'VGQJ5XJFAFSH4B4F',
          password:
            '9M0RjwLg5g0yi8IqadtpWhTPChON+EU2e7ia+B+bkQNb72PE1Dr7pFmlMwkeYFAb'
        },
        logLevel: logLevel.ERROR,
        requestTimeout: 45000,
        connectionTimeout: 45000
      }
    }
  }); */

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
