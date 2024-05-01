import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from '@aquaexplore/types';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  async login(@Payload() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}
