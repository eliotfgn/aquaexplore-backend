import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { Controller, HttpException } from '@nestjs/common';
import { throwError } from 'rxjs';
import { CreateUserDto, LoginDto, UserEntity } from '@aquaexplore/types';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  async login(@Payload() payload: any) {
    return await this.authService.login(payload);
  }

  @MessagePattern('register')
  async register(@Payload() payload: any) {
    return await this.authService.register(payload);
  }
}
