import {
  Body,
  Controller,
  HttpException,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import type { LoginDto, UserEntity } from '@aquaexplore/types';

@Controller('auth')
export class AuthController implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.authServiceClient.subscribeToResponseOf('login');
    this.authServiceClient.subscribeToResponseOf('register');
  }

  @Post('login')
  login(@Body() payload: LoginDto): Promise<UserEntity> {
    return lastValueFrom(
      this.authServiceClient
        .send('login', payload)
        .pipe(
          catchError((error) =>
            throwError(() => new HttpException(error.response, error.status)),
          ),
        ),
    );
  }

  @Post('register')
  async register(@Body() payload: any): Promise<UserEntity> {
    const data: UserEntity = await lastValueFrom(
      this.authServiceClient.send('register', payload).pipe(
        catchError((error) => {
          return throwError(
            () => new HttpException(error.response, error.status),
          );
        }),
      ),
    );

    return data;
  }
}
