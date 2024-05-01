import { Controller, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController implements OnModuleInit {
  @Client({
    options: {
      client: {
        clientId: 'api-gateway',
        brokers: [process.env.KAFKA_BROKER],
      },
      consumer: {
        groupId: 'aqua-explore/api-gateway',
      },
    },
  })
  private readonly authServiceClient: ClientKafka;

  constructor(private readonly authSerive: AuthService) {}

  async onModuleInit() {
    this.authServiceClient.subscribeToResponseOf('login');
    await this.authServiceClient.connect();
  }
}
