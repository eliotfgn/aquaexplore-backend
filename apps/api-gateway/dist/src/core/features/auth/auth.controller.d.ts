import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import type { LoginDto, UserEntity } from '@aquaexplore/types';
export declare class AuthController implements OnModuleInit {
    private readonly authService;
    private readonly authServiceClient;
    constructor(authService: AuthService, authServiceClient: ClientKafka);
    onModuleInit(): void;
    login(payload: LoginDto): Promise<UserEntity>;
    register(payload: any): Promise<UserEntity>;
}
