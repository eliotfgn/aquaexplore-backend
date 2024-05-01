import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto, UserEntity } from '@aquaexplore/types';

@Controller('auth')
export class AuthController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'api-gateway',
        brokers: ['localhost:29092'],
      },
      consumer: {
        groupId: 'aqua-explore/api-gateway',
      },
    },
  })
  authServiceClient: ClientKafka;

  constructor(private readonly authService: AuthService) {}

  async onModuleInit() {
    this.authServiceClient.subscribeToResponseOf('login');
    await this.authServiceClient.connect();
  }

  @Post('login')
  login(@Body() payload: any) {
    this.authServiceClient
      .send('login', payload)
      .subscribe((value: UserEntity) => {
        console.log(value);
      });
  }
}
