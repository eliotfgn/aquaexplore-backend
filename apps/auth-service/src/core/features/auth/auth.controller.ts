import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { Controller } from '@nestjs/common';
import { AUTH_SERVICE_NAME } from '@aquaexplore/protos';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod(AUTH_SERVICE_NAME)
  async login(@Payload() payload: any) {
    return await this.authService.login(payload);
  }

  @MessagePattern('register')
  async register(@Payload() payload: any) {
    return await this.authService.register(payload);
  }
}
