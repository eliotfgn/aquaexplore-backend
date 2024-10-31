import { AUTH_SERVICE_NAME, AuthServiceClient } from '@aquaexplore/protos';
import { LoginDto } from '@aquaexplore/types';
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AUTH_SERVICE } from 'src/config/constants';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private authServiceClient: AuthServiceClient;

  constructor(@Inject(AUTH_SERVICE) private readonly grpcClient: ClientGrpc) {}

  onModuleInit() {
    this.authServiceClient = this.grpcClient.getService(AUTH_SERVICE_NAME);
  }

  @Post('login')
  login(@Body() payload: LoginDto): Observable<any> {
    return this.authServiceClient.login(payload);
  }
}
