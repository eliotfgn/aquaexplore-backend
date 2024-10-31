import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  RegisterRequest,
} from '@aquaexplore/protos';
import { CreateUserDto, LoginDto } from '@aquaexplore/types';
import {
  Body,
  Controller,
  HttpCode,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
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
  @HttpCode(200)
  login(@Body() payload: LoginDto): Observable<any> {
    return this.authServiceClient.login(payload);
  }

  @Post('register')
  register(@Body() payload: CreateUserDto): Observable<any> {
    return this.authServiceClient.register(
      payload as unknown as RegisterRequest,
    );
  }
}
