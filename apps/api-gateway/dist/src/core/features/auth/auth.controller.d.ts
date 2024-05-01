import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthService } from './auth.service';
export declare class AuthController implements OnModuleInit {
    private readonly authService;
    private readonly authServiceClient;
    constructor(authService: AuthService, authServiceClient: ClientKafka);
    onModuleInit(): void;
    login(payload: any): Promise<any>;
    register(payload: any): Promise<any>;
}
