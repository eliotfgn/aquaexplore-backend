import { AUTH_SERVICE_NAME } from '@aquaexplore/protos';
import { CreateUserDto, LoginDto } from '@aquaexplore/types';
import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod(AUTH_SERVICE_NAME)
  async login(@Payload() payload: LoginDto) {
    return await this.authService.login(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  async register(@Payload() payload: CreateUserDto) {
    return await this.authService.register(payload);
  }
}
