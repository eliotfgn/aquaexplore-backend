import { Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/config/constants';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  AuthServiceController,
  LoginRequest,
  UserEntity,
} from '@aquaexplore/protos';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private authServiceClient: AuthServiceClient;

  constructor(@Inject(AUTH_SERVICE) private readonly grpcClient: ClientGrpc) {}

  onModuleInit() {
    this.authServiceClient = this.grpcClient.getService(AUTH_SERVICE_NAME);
  }
}
